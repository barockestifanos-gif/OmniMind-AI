import { motion } from 'framer-motion';
import { Sparkles, FileText, Brain, GraduationCap, Mic, Upload, Zap, BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudyLandingProps {
  onStartChat: (initialMessage?: string) => void;
  onBack?: () => void;
}

const suggestions = [
  'Explain quantum physics simply',
  'Create a study plan for calculus',
  'Quiz me on world history',
  'Help me write an essay outline',
  'Summarize this chapter for me',
  'What are the key concepts in biology?'
];

export const StudyLanding = ({ onStartChat, onBack }: StudyLandingProps) => {
  const features = [
    {
      icon: Upload,
      title: 'Upload Anything',
      description: 'PDFs, videos, audio, images - we handle it all'
    },
    {
      icon: Brain,
      title: 'AI Processes',
      description: 'Our AI understands and extracts key concepts'
    },
    {
      icon: FileText,
      title: 'Get Study Materials',
      description: 'Notes, flashcards, quizzes generated instantly'
    },
    {
      icon: GraduationCap,
      title: 'Study & Succeed',
      description: 'Ace your exams with personalized learning'
    }
  ];

  const tools = [
    { icon: '📝', name: 'Smart Notes', desc: 'AI-generated summaries' },
    { icon: '🎴', name: 'Flashcards', desc: 'Auto-created from content' },
    { icon: '❓', name: 'Practice Quizzes', desc: 'Test your knowledge' },
    { icon: '🎙️', name: 'Study Podcasts', desc: 'Listen while you learn' },
    { icon: '💬', name: 'AI Tutor', desc: 'Ask anything, anytime' },
    { icon: '📊', name: 'Progress Tracking', desc: 'See your growth' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[hsl(265,50%,4%)]">
      {/* Animated background beams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[800px] bg-gradient-to-b from-purple-600/20 via-purple-500/5 to-transparent blur-3xl transform -rotate-12 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[600px] bg-gradient-to-b from-violet-500/15 via-purple-600/5 to-transparent blur-3xl transform rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-gradient-to-t from-purple-800/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
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
                className="h-10 w-10 rounded-xl text-purple-300 hover:text-white hover:bg-purple-500/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">StudyMind AI</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              onClick={() => onStartChat()}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold px-6 rounded-full shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by Advanced AI</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Turn any content into</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              study materials
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-purple-200/70 max-w-2xl mx-auto mb-10"
          >
            Upload PDFs, videos, or audio. Get instant notes, flashcards, and quizzes. 
            Study smarter with your AI-powered learning assistant.
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
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-10 py-6 text-lg rounded-full shadow-2xl shadow-purple-600/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started - It's Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-white px-8 py-6 text-lg rounded-full transition-all"
            >
              <Mic className="w-5 h-5 mr-2" />
              Try Voice Mode
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
                className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/40 hover:text-white transition-all hover:scale-105"
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
            className="mt-8 flex items-center justify-center gap-6 text-sm text-purple-300/50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Works on any device</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Processing Demo Card */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative rounded-2xl bg-gradient-to-b from-purple-900/40 to-purple-950/60 border border-purple-500/20 p-6 backdrop-blur-xl shadow-2xl shadow-purple-900/50">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-violet-500/20 to-purple-600/20 rounded-2xl blur-xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-600/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Processing your content</p>
                    <p className="text-sm text-purple-300/60">Organic Chemistry Chapter 5.pdf</p>
                  </div>
                </div>

                {/* Progress steps */}
                <div className="space-y-3">
                  {['Extracting text & images', 'Identifying key concepts', 'Generating study materials'].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        i < 2 ? 'bg-green-500' : 'bg-purple-600 animate-pulse'
                      }`}>
                        {i < 2 ? (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className={`text-sm ${i < 2 ? 'text-purple-200' : 'text-purple-300/70'}`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              How it works
            </h2>
            <p className="text-purple-300/60 max-w-md mx-auto">
              Four simple steps to transform your learning experience
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
                {/* Connector line */}
                {i < features.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-purple-500/50 to-purple-500/20" />
                )}
                
                <div className="p-6 rounded-2xl bg-purple-900/20 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:bg-purple-900/30 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-violet-600/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-purple-300" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-purple-300/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to study
            </h2>
            <p className="text-purple-300/60 max-w-md mx-auto">
              Powerful AI tools designed for effective learning
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
                className="flex items-center gap-4 p-4 rounded-xl bg-purple-900/20 border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer hover:bg-purple-900/30"
              >
                <span className="text-3xl">{tool.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <p className="text-sm text-purple-300/50">{tool.desc}</p>
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
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to study smarter?
            </h2>
            <p className="text-lg text-purple-300/60 mb-8">
              Join thousands of students who are acing their exams with AI-powered study tools.
            </p>
            <Button
              onClick={() => onStartChat()}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-12 py-6 text-lg rounded-full shadow-2xl shadow-purple-600/40 hover:shadow-purple-500/60 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-purple-500/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-purple-300/40">
            StudyMind AI — Part of OmniMind AI Platform
          </p>
        </div>
      </footer>
    </div>
  );
};
