import { Mode } from '@/types/modes';
import { getModeConfig } from '@/config/modes';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface VoiceChatOverlayProps {
  mode: Mode;
  isOpen: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  onClose: () => void;
  onToggleListening: () => void;
  onSendTranscript: () => void;
}

export const VoiceChatOverlay = ({
  mode,
  isOpen,
  isListening,
  isSpeaking,
  transcript,
  onClose,
  onToggleListening,
  onSendTranscript,
}: VoiceChatOverlayProps) => {
  const config = getModeConfig(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>();

  // Animated rings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = 300;
    const h = canvas.height = 300;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < 4; i++) {
        const radius = 40 + i * 25 + (isListening ? Math.sin(t * 3 + i) * 12 : 0) + (isSpeaking ? Math.cos(t * 4 + i) * 15 : 0);
        const alpha = isListening || isSpeaking ? 0.3 - i * 0.06 : 0.1 - i * 0.02;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${isListening ? '0, 84%, 60%' : isSpeaking ? '217, 91%, 60%' : '215, 20%, 55%'}, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      t += 0.02;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [isOpen, isListening, isSpeaking]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl"
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-6 right-6 h-10 w-10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Mode indicator */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="text-2xl">{config.icon}</span>
            <span className={`font-display font-bold text-lg ${config.textGradientClass}`}>
              {config.name}
            </span>
          </motion.div>

          {/* Visualizer */}
          <div className="relative mb-8">
            <canvas ref={canvasRef} className="w-[300px] h-[300px]" />
            
            {/* Center mic button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onToggleListening}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-destructive text-destructive-foreground shadow-[0_0_40px_-5px] shadow-destructive/50'
                  : 'glass-strong hover:bg-muted/50'
              }`}
              style={!isListening ? { boxShadow: `0 0 30px -5px hsl(var(--${mode}-primary) / 0.3)` } : undefined}
            >
              {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </motion.button>
          </div>

          {/* Status */}
          <motion.p
            key={isListening ? 'listening' : isSpeaking ? 'speaking' : 'idle'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground mb-4"
          >
            {isListening ? 'Listening... Speak now' : isSpeaking ? 'AI is speaking...' : 'Tap the mic to start'}
          </motion.p>

          {/* Live transcript */}
          <AnimatePresence mode="wait">
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-md px-6 py-4 rounded-2xl glass-strong text-center"
              >
                <p className="text-sm">{transcript}</p>
                <Button
                  size="sm"
                  className="mt-3"
                  style={{ background: config.gradient }}
                  onClick={onSendTranscript}
                >
                  Send Message
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          <p className="absolute bottom-8 text-xs text-muted-foreground/60">
            Voice chat uses your browser's speech recognition
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
