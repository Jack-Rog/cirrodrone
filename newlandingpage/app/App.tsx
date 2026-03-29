import { useState } from 'react';
import { motion } from 'motion/react';
import { HeroVariantA } from './components/HeroVariantA';
import { HeroVariantB } from './components/HeroVariantB';
import { HowCirroFits } from './components/HowCirroFits';
import { WhyItMatters } from './components/WhyItMatters';
import { BetaAccessSection } from './components/BetaAccessSection';
import { Footer } from './components/Footer';
import { CirroLogo } from './components/CirroLogo';
import { LayoutGrid, GitBranch } from 'lucide-react';

export default function App() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed header with Cirro logo */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-lg"
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.9)',
               border: '1px solid rgba(0, 0, 0, 0.1)',
               boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
             }}>
          <CirroLogo size={32} />
        </div>
      </motion.div>

      {/* Variant Switcher - Fixed position */}
      <motion.div
        className="fixed top-8 right-8 z-50 flex gap-2 p-2 rounded-xl backdrop-blur-lg"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button
          onClick={() => setVariant('A')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            variant === 'A' ? 'shadow-md' : ''
          }`}
          style={{
            backgroundColor: variant === 'A' ? 'var(--cirro-primary)' : 'transparent',
            color: variant === 'A' ? 'white' : 'var(--cirro-secondary)',
            fontWeight: 600,
          }}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-sm">Variant A</span>
        </button>
        <button
          onClick={() => setVariant('B')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            variant === 'B' ? 'shadow-md' : ''
          }`}
          style={{
            backgroundColor: variant === 'B' ? 'var(--cirro-primary)' : 'transparent',
            color: variant === 'B' ? 'white' : 'var(--cirro-secondary)',
            fontWeight: 600,
          }}
        >
          <GitBranch className="w-4 h-4" />
          <span className="text-sm">Variant B</span>
        </button>
      </motion.div>

      {/* Hero Section - Variant A or B */}
      {variant === 'A' ? <HeroVariantA /> : <HeroVariantB />}

      {/* How Cirro Fits */}
      <HowCirroFits />

      {/* Why It Matters */}
      <WhyItMatters />

      {/* Beta Access Section */}
      <BetaAccessSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}