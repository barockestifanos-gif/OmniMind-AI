import { Message, Mode } from '@/types/modes';
import { getModeConfig } from '@/config/modes';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilePreview } from './FilePreview';

interface ChatMessageProps {
  message: Message;
  mode: Mode;
  onSpeak?: (text: string) => void;
}

export const ChatMessage = ({ message, mode, onSpeak }: ChatMessageProps) => {
  const config = getModeConfig(mode);
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-0`}
    >
      <div className={`flex items-start gap-3 max-w-[90%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-primary/20' : ''
          }`}
          style={!isUser ? { background: config.gradient } : undefined}
        >
          {isUser ? '👤' : config.icon}
        </div>

        {/* Message bubble */}
        <div className={`relative group`}>
          <div
            className={`chat-bubble ${
              isUser 
                ? 'chat-bubble-user bg-primary text-primary-foreground' 
                : 'chat-bubble-ai'
            }`}
            style={!isUser ? { 
              borderLeft: `2px solid hsl(var(--${mode}-primary))` 
            } : undefined}
          >
            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mb-2 space-y-1">
                {message.attachments.map((file, i) => (
                  <FilePreview key={i} file={file} />
                ))}
              </div>
            )}

            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content.split('\n').map((line, i) => {
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <div key={i} className={i > 0 ? 'mt-2' : ''}>
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j}>{part.slice(2, -2)}</strong>;
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </div>
                );
              })}
            </div>

            {/* Timestamp */}
            <div className={`text-[10px] mt-2 ${isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {/* Speak button for AI messages */}
          {!isUser && onSpeak && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              onClick={() => onSpeak(message.content)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
