import { Mode, VoiceOption } from '@/types/modes';
import { getModeConfig } from '@/config/modes';
import { Settings, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface VoiceSettingsProps {
  mode: Mode;
  selectedVoice: VoiceOption | null;
  onSelectVoice: (voice: VoiceOption) => void;
  onTestVoice: (text: string, voice: VoiceOption) => void;
}

export const VoiceSettings = ({
  mode,
  selectedVoice,
  onSelectVoice,
  onTestVoice,
}: VoiceSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = getModeConfig(mode);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 rounded-lg"
      >
        <Settings className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-xl p-4 z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-semibold text-sm">Voice Settings</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-2">
                {config.voiceOptions.map((voice) => (
                  <div
                    key={voice.id}
                    onClick={() => onSelectVoice(voice)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedVoice?.id === voice.id
                        ? 'bg-white/10 ring-1 ring-white/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{voice.name}</p>
                        <p className="text-xs text-muted-foreground">{voice.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTestVoice('Hello! This is how I sound.', voice);
                        }}
                        className="h-8 w-8"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
