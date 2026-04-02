import { useRef, useEffect, useState } from 'react';
import { Mode, Message, FileAttachment } from '@/types/modes';
import { getModeConfig } from '@/config/modes';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { VoiceSettings } from './VoiceSettings';
import { VoiceChatOverlay } from './VoiceChatOverlay';
import { SignInPrompt } from './SignInPrompt';
import { ArrowLeft, Trash2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '@/hooks/useVoice';

const GUEST_MESSAGE_LIMIT = 5;

interface ChatInterfaceProps {
  mode: Mode;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string, attachments?: FileAttachment[]) => void;
  onBack: () => void;
  onClear: () => void;
  isAuthenticated: boolean;
  guestMessageCount: number;
}

export const ChatInterface = ({
  mode,
  messages,
  isLoading,
  onSendMessage,
  onBack,
  onClear,
  isAuthenticated,
  guestMessageCount,
}: ChatInterfaceProps) => {
  const config = getModeConfig(mode);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const {
    isListening,
    isSpeaking,
    transcript,
    selectedVoice,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    setSelectedVoice,
    clearTranscript,
  } = useVoice();

  useEffect(() => {
    if (!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT) {
      setShowSignInModal(true);
    }
  }, [guestMessageCount, isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
      speak(cleanText, selectedVoice || undefined);
    }
  };

  const handleSend = (message: string, attachments?: FileAttachment[]) => {
    if (!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT) {
      setShowSignInModal(true);
      return;
    }
    onSendMessage(message, attachments);
  };

  const handleVoiceSend = () => {
    if (transcript.trim()) {
      handleSend(transcript.trim());
      clearTranscript();
      stopListening();
      setShowVoiceChat(false);
    }
  };

  const toggleVoiceListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const guestQuestionsLeft = isAuthenticated ? null : Math.max(0, GUEST_MESSAGE_LIMIT - guestMessageCount);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 opacity-10" style={{ background: config.gradient }} />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-strong border-b border-white/5"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{config.icon}</span>
              <div>
                <h1 className={`font-display font-bold ${config.textGradientClass}`}>{config.name}</h1>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {guestQuestionsLeft !== null && guestQuestionsLeft > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary">
                  {guestQuestionsLeft} question{guestQuestionsLeft !== 1 ? 's' : ''} left
                </span>
              </div>
            )}
            {guestQuestionsLeft !== null && guestQuestionsLeft <= 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
                <span className="text-xs font-medium text-destructive">Limit reached</span>
              </div>
            )}

            <AnimatePresence>
              {isSpeaking && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={stopSpeaking}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs"
                >
                  <div className="voice-wave"><span /><span /><span /><span /><span /></div>
                  <span>Speaking</span>
                  <VolumeX className="h-3 w-3" />
                </motion.button>
              )}
            </AnimatePresence>

            <VoiceSettings mode={mode} selectedVoice={selectedVoice} onSelectVoice={setSelectedVoice} onTestVoice={speak} />

            {messages.length > 0 && (
              <Button variant="ghost" size="icon" onClick={onClear} className="h-9 w-9 rounded-lg text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Messages area */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <div className="mx-auto px-6 py-6 max-w-4xl">
          {!isAuthenticated && !bannerDismissed && messages.length > 0 && (
            <SignInPrompt variant="banner" onDismiss={() => setBannerDismissed(true)} />
          )}

          {messages.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <p className="text-muted-foreground text-sm">Send a message to get started</p>
              {!isAuthenticated && (
                <p className="text-muted-foreground/60 text-xs mt-2">You have {GUEST_MESSAGE_LIMIT} free questions as a guest</p>
              )}
            </motion.div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} mode={mode} onSpeak={message.role === 'assistant' ? handleSpeak : undefined} />
              ))}
              <AnimatePresence>
                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex justify-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: config.gradient }}>
                        <span className="text-sm">{config.icon}</span>
                      </div>
                      <div className="chat-bubble chat-bubble-ai">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      <footer className="relative z-10 border-t border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <ChatInput
            mode={mode}
            onSend={handleSend}
            isLoading={isLoading}
            isListening={isListening}
            transcript={transcript}
            onStartListening={startListening}
            onStopListening={stopListening}
            onClearTranscript={clearTranscript}
            onOpenVoiceChat={() => setShowVoiceChat(true)}
            disabled={!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT}
          />
        </div>
      </footer>

      {/* Voice Chat Overlay */}
      <VoiceChatOverlay
        mode={mode}
        isOpen={showVoiceChat}
        isListening={isListening}
        isSpeaking={isSpeaking}
        transcript={transcript}
        onClose={() => { setShowVoiceChat(false); stopListening(); clearTranscript(); }}
        onToggleListening={toggleVoiceListening}
        onSendTranscript={handleVoiceSend}
      />

      {/* Sign-in modal */}
      <AnimatePresence>
        {showSignInModal && <SignInPrompt onDismiss={() => setShowSignInModal(false)} />}
      </AnimatePresence>
    </div>
  );
};
