import { useState, useRef, useEffect } from 'react';
import { Mode } from '@/types/modes';
import { FileAttachment } from '@/types/modes';
import { getModeConfig } from '@/config/modes';
import { Send, Mic, MicOff, Loader2, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePreview } from './FilePreview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ChatInputProps {
  mode: Mode;
  onSend: (message: string, attachments?: FileAttachment[]) => void;
  isLoading: boolean;
  isListening: boolean;
  transcript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onClearTranscript: () => void;
  onOpenVoiceChat: () => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export const ChatInput = ({
  mode,
  onSend,
  isLoading,
  isListening,
  transcript,
  onStartListening,
  onStopListening,
  onClearTranscript,
  onOpenVoiceChat,
  disabled = false,
}: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = getModeConfig(mode);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const uploadFile = async (file: File): Promise<FileAttachment | null> => {
    if (file.size > MAX_FILE_SIZE) {
      toast({ title: 'File too large', description: `Max size is 20MB. "${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB`, variant: 'destructive' });
      return null;
    }

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from('chat-attachments').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return null;
    }

    const { data: urlData } = supabase.storage.from('chat-attachments').getPublicUrl(path);

    return {
      name: file.name,
      type: file.type,
      url: urlData.publicUrl,
      size: file.size,
    };
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    const uploaded = await Promise.all(files.map(uploadFile));
    const valid = uploaded.filter(Boolean) as FileAttachment[];
    setAttachments(prev => [...prev, ...valid]);
    setIsUploading(false);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const message = input.trim();
    if ((!message && attachments.length === 0) || isLoading) return;

    onSend(message || '(attached files)', attachments.length > 0 ? attachments : undefined);
    setInput('');
    setAttachments([]);
    onClearTranscript();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;

    setIsUploading(true);
    const uploaded = await Promise.all(files.map(uploadFile));
    const valid = uploaded.filter(Boolean) as FileAttachment[];
    setAttachments(prev => [...prev, ...valid]);
    setIsUploading(false);
  };

  return (
    <div
      className="relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Suggestion chips */}
      <AnimatePresence>
        {input === '' && !isLoading && attachments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-wrap gap-2 mb-3"
          >
            {config.suggestions.slice(0, 3).map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInput(suggestion)}
                className="text-xs px-3 py-1.5 rounded-full glass hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File previews */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-3"
          >
            {attachments.map((file, i) => (
              <FilePreview key={i} file={file} compact onRemove={() => removeAttachment(i)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input container */}
      <div className="glass-strong rounded-2xl p-2 flex items-end gap-2">
        {/* File upload */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="*/*"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || disabled}
          className="h-10 w-10 rounded-xl flex-shrink-0 hover:bg-muted/50"
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Paperclip className="h-5 w-5" />
          )}
        </Button>

        {/* Voice button - long press opens voice chat */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenVoiceChat}
          className="h-10 w-10 rounded-xl flex-shrink-0 hover:bg-muted/50"
        >
          <Mic className="h-5 w-5" />
        </Button>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={`Ask your ${config.name.toLowerCase().replace(' mode', '')} assistant...`}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none text-sm py-2.5 px-2 max-h-[120px] placeholder:text-muted-foreground"
          disabled={isLoading || disabled}
        />

        {/* Send button */}
        <Button
          onClick={handleSubmit}
          disabled={(!input.trim() && attachments.length === 0) || isLoading}
          size="icon"
          className="h-10 w-10 rounded-xl flex-shrink-0 transition-all"
          style={{ background: (input.trim() || attachments.length > 0) && !isLoading ? config.gradient : undefined }}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Voice indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-destructive/20 border border-destructive/30 flex items-center gap-2"
          >
            <div className="voice-wave text-destructive">
              <span /><span /><span /><span /><span />
            </div>
            <span className="text-xs text-destructive">Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
