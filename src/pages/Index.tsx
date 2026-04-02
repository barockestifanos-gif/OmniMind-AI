import { useState } from 'react';
import { Mode, FileAttachment } from '@/types/modes';
import { ModeSelector } from '@/components/ModeSelector';
import { ChatInterface } from '@/components/ChatInterface';
import { useChat } from '@/hooks/useChat';
import { AnimatePresence, motion } from 'framer-motion';

type ViewType = 'selector' | 'chat';

interface IndexProps {
  onSignOut: () => void;
  isAuthenticated: boolean;
}

const Index = ({ onSignOut, isAuthenticated }: IndexProps) => {
  const [view, setView] = useState<ViewType>('selector');
  const { messages, isLoading, currentMode, sendMessage, clearMessages, changeMode } = useChat();
  const [guestMessageCount, setGuestMessageCount] = useState(0);

  const handleSelectMode = (mode: Mode) => {
    changeMode(mode);
    setView('chat');
  };

  const handleBack = () => {
    setView('selector');
  };

  const handleSendMessage = (message: string, attachments?: FileAttachment[]) => {
    if (!isAuthenticated) {
      setGuestMessageCount(prev => prev + 1);
    }
    sendMessage(message, attachments);
  };

  return (
    <AnimatePresence mode="wait">
      {view === 'selector' ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModeSelector
            currentMode={currentMode}
            onSelectMode={handleSelectMode}
            onSignOut={onSignOut}
            isAuthenticated={isAuthenticated}
          />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <ChatInterface
            mode={currentMode}
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            onClear={clearMessages}
            isAuthenticated={isAuthenticated}
            guestMessageCount={guestMessageCount}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
