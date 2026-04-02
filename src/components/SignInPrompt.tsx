import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, History, Shield, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SignInPromptProps {
  onDismiss?: () => void;
  variant?: 'modal' | 'banner';
}

export const SignInPrompt = ({ onDismiss, variant = 'modal' }: SignInPromptProps) => {
  const navigate = useNavigate();

  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl mb-4"
      >
        <div className="relative rounded-2xl border border-primary/20 bg-primary/[0.04] backdrop-blur-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--gradient-hero)' }}>
            <History className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">You're chatting as a guest</p>
            <p className="text-xs text-muted-foreground">Sign in to save your chat history and preferences</p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate('/auth')}
            className="rounded-xl shrink-0 gap-1.5 text-xs font-semibold"
            style={{ background: 'var(--gradient-hero)' }}
          >
            Sign In
            <ArrowRight className="h-3 w-3" />
          </Button>
          {onDismiss && (
            <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onDismiss}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="rounded-3xl border border-white/[0.08] bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Gradient header */}
          <div className="relative px-8 pt-10 pb-8 text-center" style={{ background: 'var(--gradient-hero)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/20" />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                You've used your free questions!
              </h2>
              <p className="text-white/80 text-sm max-w-xs mx-auto">
                Create a free account to keep chatting and unlock all features
              </p>
            </motion.div>
          </div>

          {/* Benefits */}
          <div className="px-8 py-6 space-y-4">
            {[
              { icon: History, title: 'Chat History', desc: 'Access your past conversations anytime' },
              { icon: MessageSquare, title: 'Unlimited Messages', desc: 'No limits on questions per session' },
              { icon: Shield, title: 'Personal Preferences', desc: 'Save theme, voice, and mode settings' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 space-y-3">
            <Button
              onClick={() => navigate('/auth')}
              className="w-full h-12 rounded-xl font-semibold text-base gap-2"
              style={{ background: 'var(--gradient-hero)' }}
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
            {onDismiss && (
              <Button
                variant="ghost"
                onClick={onDismiss}
                className="w-full h-10 rounded-xl text-muted-foreground text-sm"
              >
                Continue as guest (limited)
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
