import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, BarChart3, Target, Mic, PieChart, Users, FileText, CheckCircle2, ArrowLeft, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessLandingProps {
  onStartChat: (initialMessage?: string) => void;
  onBack?: () => void;
}

const suggestions = [
  'Write a business plan outline',
  'Help me with my pitch deck',
  'Analyze my marketing strategy',
  'Draft a professional email',
  'Calculate ROI for my project',
  'Brainstorm business ideas'
];

export const BusinessLanding = ({ onStartChat, onBack }: BusinessLandingProps) => {
  const features = [
    {
      icon: Target,
      title: 'Strategy Planning',
      description: 'Build winning business strategies'
    },
    {
      icon: TrendingUp,
      title: 'Growth Tactics',
      description: 'Scale your business effectively'
    },
    {
      icon: BarChart3,
      title: 'Financial Analysis',
      description: 'Make data-driven decisions'
    },
    {
      icon: Users,
      title: 'Team Building',
      description: 'Hire and manage top talent'
    }
  ];

  const tools = [
    { icon: '📊', name: 'Business Plans', desc: 'Professional templates' },
    { icon: '💰', name: 'Financial Models', desc: 'ROI & projections' },
    { icon: '📈', name: 'Market Analysis', desc: 'Competitive insights' },
    { icon: '🎯', name: 'Pitch Decks', desc: 'Investor-ready presentations' },
    { icon: '📧', name: 'Professional Emails', desc: 'Business communication' },
    { icon: '🤝', name: 'Negotiation Tips', desc: 'Close better deals' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[hsl(226,40%,4%)]">
      {/* Animated background beams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[800px] bg-gradient-to-b from-indigo-600/20 via-blue-500/5 to-transparent blur-3xl transform -rotate-12 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[600px] bg-gradient-to-b from-violet-500/15 via-indigo-600/5 to-transparent blur-3xl transform rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-gradient-to-t from-indigo-800/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-10 w-10 rounded-xl text-indigo-300 hover:text-white hover:bg-indigo-500/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">BusinessMind AI</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              onClick={() => onStartChat()}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-105"
            >
              Start Now
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24">
        <div className="container mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Your Strategic Partner</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Scale your business</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-500 bg-clip-text text-transparent">
              with AI power
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-indigo-200/70 max-w-2xl mx-auto mb-10"
          >
            Strategic planning, financial modeling, pitch decks, and expert business advice—
            your AI-powered business consultant available 24/7.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => onStartChat()}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-6 text-lg rounded-full shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Get Strategic Advice
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-white px-8 py-6 text-lg rounded-full transition-all"
            >
              <Mic className="w-5 h-5 mr-2" />
              Voice Consultant
            </Button>
          </motion.div>

          {/* Quick suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
          >
            {suggestions.map((suggestion, i) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => onStartChat(suggestion)}
                className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-white transition-all hover:scale-105"
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-indigo-300/50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Data-driven insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Expert-level analysis</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Your business toolkit
            </h2>
            <p className="text-indigo-300/60 max-w-md mx-auto">
              Everything you need to build and grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {i < features.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-indigo-500/50 to-indigo-500/20" />
                )}
                
                <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/10 hover:border-indigo-500/30 transition-all hover:bg-indigo-900/30 group-hover:shadow-lg group-hover:shadow-indigo-500/10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600/30 to-violet-600/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-indigo-300" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-indigo-300/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Professional business tools
            </h2>
            <p className="text-indigo-300/60 max-w-md mx-auto">
              AI-powered resources for entrepreneurs
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/10 hover:border-indigo-500/30 transition-all cursor-pointer hover:bg-indigo-900/30"
              >
                <span className="text-3xl">{tool.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <p className="text-sm text-indigo-300/50">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <PieChart className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to accelerate growth?
            </h2>
            <p className="text-lg text-indigo-300/60 mb-8">
              Get expert business advice and strategic planning powered by AI.
            </p>
            <Button
              onClick={() => onStartChat()}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-12 py-6 text-lg rounded-full shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-500/60 transition-all hover:scale-105"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Building Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-indigo-500/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-indigo-300/40">
            BusinessMind AI — Part of OmniMind AI Platform
          </p>
        </div>
      </footer>
    </div>
  );
};
