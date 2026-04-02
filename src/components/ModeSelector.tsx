import { Mode } from '@/types/modes';
import { modeConfigs } from '@/config/modes';
import { ModeCard } from './ModeCard';
import { motion } from 'framer-motion';
import { Sparkles, LogOut, Sun, Moon, LogIn, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/App';
import { useNavigate } from 'react-router-dom';

interface ModeSelectorProps {
  currentMode: Mode;
  onSelectMode: (mode: Mode) => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
}

export const ModeSelector = ({ currentMode, onSelectMode, onSignOut, isAuthenticated }: ModeSelectorProps) => {
  const modes = Object.values(modeConfigs);
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Ambient glow — two soft blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] left-[10%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.08]" style={{ background: 'hsl(var(--primary))' }} />
        <div className="absolute bottom-[-20%] right-[5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.06]" style={{ background: 'hsl(var(--accent))' }} />
      </div>

      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 backdrop-blur-2xl border-b border-border/40"
        style={{ background: 'hsl(var(--background) / 0.85)' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight">OmniMind</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#modes" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Modes</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">About</a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSignOut}
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/auth')}
                className="rounded-lg text-muted-foreground hover:text-foreground gap-1.5 text-sm"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => {
                const el = document.getElementById('modes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex rounded-lg text-sm font-medium gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Guest banner */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 border-b border-primary/10 bg-primary/[0.04]"
        >
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-center">
            <p className="text-xs text-muted-foreground">
              You're browsing as a guest — chat history won't be saved.{' '}
              <button onClick={() => navigate('/auth')} className="text-primary font-medium hover:underline">Sign in</button> to keep conversations.
            </p>
          </div>
        </motion.div>
      )}

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 pb-32 md:pt-36 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/30 mb-10"
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide">AI-Powered Intelligence</span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-7">
            <span className="text-foreground">Your AI for </span>
            <span className="gradient-text">everything.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed mb-12">
            One intelligent platform for study, health, business, and life — pick a mode and start instantly.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => {
                const el = document.getElementById('modes');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl text-sm font-semibold px-7 h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onSelectMode('study')}
              className="rounded-xl text-sm font-semibold px-7 h-12 border-border/60 text-foreground hover:bg-card/50"
            >
              See Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ─── Modes Section ─── */}
      <section id="modes" className="relative z-10 px-6 pb-32 md:pb-40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Choose your mode
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Each mode is a specialized AI tuned for a specific domain. Pick one to start chatting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {modes.map((mode, index) => (
              <ModeCard
                key={mode.id}
                config={mode}
                isSelected={currentMode === mode.id}
                isRecommended={mode.id === 'study'}
                onClick={() => onSelectMode(mode.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="relative z-10 px-6 pb-32 md:pb-40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Built for clarity
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Simple tools that let you focus on what matters — thinking, creating, and getting things done.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Voice & Text', desc: 'Talk or type — the AI understands both equally well.' },
              { title: 'File Uploads', desc: 'Drop any file into the chat and get instant analysis.' },
              { title: 'Instant Modes', desc: 'Switch context in one click. No setup, no friction.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-7"
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="about" className="relative z-10 border-t border-border/30 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">OmniMind</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 OmniMind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
