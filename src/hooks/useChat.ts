import { useState, useCallback } from 'react';
import { Message, Mode, FileAttachment } from '@/types/modes';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const useChat = (initialMode: Mode = 'study') => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>(initialMode);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const sendMessage = useCallback(async (content: string, attachments?: FileAttachment[]) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Prepare message history for AI
    const chatHistory: ChatMessage[] = messages.map(msg => ({
      role: msg.role,
      content: msg.attachments?.length
        ? `${msg.content}\n\n[Attached files: ${msg.attachments.map(a => `${a.name} (${a.type})`).join(', ')}]`
        : msg.content,
    }));

    // Build current message content with attachment info
    let currentContent = content;
    if (attachments?.length) {
      currentContent += `\n\n[Attached files: ${attachments.map(a => `${a.name} (${a.type})`).join(', ')}]`;
    }
    chatHistory.push({ role: 'user', content: currentContent });

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: chatHistory,
          mode: currentMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to get response: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
      let assistantMessageCreated = false;

      const updateAssistantMessage = (newContent: string) => {
        assistantContent = newContent;
        setMessages(prev => {
          if (!assistantMessageCreated) {
            assistantMessageCreated = true;
            return [...prev, {
              id: generateId(),
              role: 'assistant' as const,
              content: newContent,
              timestamp: new Date(),
            }];
          }
          return prev.map((msg, i) => 
            i === prev.length - 1 && msg.role === 'assistant'
              ? { ...msg, content: newContent }
              : msg
          );
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (deltaContent) {
              assistantContent += deltaContent;
              updateAssistantMessage(assistantContent);
            }
          } catch {
            // Incomplete JSON, put it back
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (deltaContent) {
              assistantContent += deltaContent;
              updateAssistantMessage(assistantContent);
            }
          } catch {
            // Ignore partial leftovers
          }
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [currentMode, messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const changeMode = useCallback((mode: Mode) => {
    setCurrentMode(mode);
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    currentMode,
    sendMessage,
    clearMessages,
    changeMode,
  };
};
