import { ModeConfig } from '@/types/modes';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Briefcase, LayoutDashboard, Languages, Star } from 'lucide-react';

const modeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  study: BookOpen,
  health: Heart,
  business: Briefcase,
  management: LayoutDashboard,
  amharic: Languages,
};

interface ModeCardProps {
  config: ModeConfig;
  isSelected: boolean;
  isRecommended?: boolean;
  onClick: () => void;
  index: number;
}

export const ModeCard = ({ config, isSelected, isRecommended, onClick, index }: ModeCardProps) => {
  const Icon = modeIcons[config.id] || BookOpen;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      aria-label={`Select ${config.name}`}
      className={`group relative text-left w-full rounded-2xl border transition-all duration-300 p-6 ${
        isRecommended
          ? 'border-primary/30 bg-primary/[0.04]'
          : isSelected
          ? 'border-border/60 bg-card/50'
          : 'border-border/30 bg-card/20 hover:border-border/50 hover:bg-card/40'
      }`}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-wide uppercase">
          <Star className="w-2.5 h-2.5" />
          Popular
        </div>
      )}

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          boxShadow: `0 0 40px -15px hsl(var(--${config.id}-primary) / 0.2)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, hsl(var(--${config.id}-primary) / 0.12), hsl(var(--${config.id}-secondary) / 0.06))`,
            border: `1px solid hsl(var(--${config.id}-primary) / 0.15)`,
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: `hsl(var(--${config.id}-primary))` }}
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-semibold text-foreground mb-1.5 tracking-tight">
          {config.name}
        </h3>

        {/* Description — kept very short */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {config.description}
        </p>
      </div>
    </motion.button>
  );
};
