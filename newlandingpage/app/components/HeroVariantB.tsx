import { motion } from 'motion/react';
import { ArrowRight, Cpu, Layers, Network, Workflow, Cloud, Terminal } from 'lucide-react';

export function HeroVariantB() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--cirro-neutral)] to-white" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Hero content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1 }}>
              The ecosystem layer
              <br />
              <span style={{ color: 'var(--cirro-primary)' }}>for drones</span>
            </h1>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ color: 'var(--cirro-secondary)' }}
          >
            Connect your drone hardware into a wider network of apps, workflows, and integrations.
            One connection. Infinite possibilities.
          </motion.p>
        </div>

        {/* Technical diagram visualization */}
        <motion.div
          className="relative mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {/* Drone Hardware Column */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-sm tracking-wider opacity-50 mb-2" style={{ color: 'var(--cirro-secondary)' }}>
                HARDWARE
              </div>
              <motion.div
                className="w-32 h-32 rounded-2xl flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--cirro-primary)',
                  boxShadow: '0 8px 32px rgba(49, 100, 130, 0.25)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Cpu className="w-12 h-12 text-white" />
              </motion.div>
              <div className="text-center mt-2">
                <div className="text-sm opacity-70" style={{ color: 'var(--cirro-secondary)' }}>
                  Drone Platforms
                </div>
              </div>
            </motion.div>

            {/* Arrow and flow */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <svg width="80" height="4" className="hidden md:block">
                <motion.line
                  x1="0" y1="2" x2="80" y2="2"
                  stroke="var(--cirro-primary)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.polygon
                  points="74,0 80,2 74,4"
                  fill="var(--cirro-primary)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                />
              </svg>
            </motion.div>

            {/* Cirro Layer Column */}
            <motion.div
              className="flex flex-col items-center gap-4 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-sm tracking-wider opacity-50 mb-2" style={{ color: 'var(--cirro-secondary)' }}>
                ORCHESTRATION
              </div>
              
              {/* Multi-layer stack */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-8 rounded-3xl opacity-20"
                  style={{ border: '2px dashed var(--cirro-primary)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative flex flex-col gap-2">
                  {[
                    { icon: Network, label: 'Connect' },
                    { icon: Layers, label: 'CIRRO', main: true },
                    { icon: Workflow, label: 'Manage' },
                  ].map((layer, i) => (
                    <motion.div
                      key={i}
                      className={`${layer.main ? 'w-40 h-40' : 'w-32 h-16'} rounded-2xl flex flex-col items-center justify-center ${layer.main ? 'gap-2' : ''}`}
                      style={{ 
                        backgroundColor: 'var(--cirro-primary)',
                        boxShadow: layer.main 
                          ? '0 12px 48px rgba(49, 100, 130, 0.35)' 
                          : '0 4px 16px rgba(49, 100, 130, 0.2)',
                        opacity: layer.main ? 1 : 0.9
                      }}
                      initial={{ y: 20 * i, opacity: 0 }}
                      animate={{ y: 0, opacity: layer.main ? 1 : 0.9 }}
                      transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <layer.icon className={`${layer.main ? 'w-12 h-12' : 'w-6 h-6'} text-white`} />
                      <span className={`text-white tracking-wider ${layer.main ? 'text-xl' : 'text-xs'}`}
                            style={{ fontWeight: layer.main ? 700 : 600 }}>
                        {layer.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-2">
                <div className="text-sm opacity-70" style={{ color: 'var(--cirro-secondary)' }}>
                  Unified Platform
                </div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <svg width="80" height="4" className="hidden md:block">
                <motion.line
                  x1="0" y1="2" x2="80" y2="2"
                  stroke="var(--cirro-tertiary)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
                <motion.polygon
                  points="74,0 80,2 74,4"
                  fill="var(--cirro-tertiary)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                />
              </svg>
            </motion.div>

            {/* Ecosystem Column */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="text-sm tracking-wider opacity-50 mb-2" style={{ color: 'var(--cirro-secondary)' }}>
                ECOSYSTEM
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Cloud, label: 'Apps' },
                  { icon: Workflow, label: 'Flows' },
                  { icon: Terminal, label: 'APIs' },
                  { icon: Network, label: 'Systems' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1"
                    style={{ 
                      backgroundColor: 'var(--cirro-tertiary)',
                      boxShadow: '0 4px 16px rgba(130, 85, 35, 0.2)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                    <span className="text-xs text-white" style={{ fontWeight: 600 }}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-2">
                <div className="text-sm opacity-70" style={{ color: 'var(--cirro-secondary)' }}>
                  Infinite Integration
                </div>
              </div>
            </motion.div>
          </div>

          {/* Architectural note */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <p className="text-sm opacity-50 max-w-2xl mx-auto" style={{ color: 'var(--cirro-secondary)' }}>
              Single connection point • Unified APIs • Cross-platform compatibility
            </p>
          </motion.div>
        </motion.div>

        {/* Dual CTA cards - same as Variant A */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {/* Pilot CTA */}
          <motion.div
            className="group relative p-10 rounded-2xl overflow-hidden cursor-pointer"
            style={{ 
              backgroundColor: 'rgba(49, 100, 130, 0.05)',
              border: '1px solid rgba(49, 100, 130, 0.2)'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <div className="text-sm tracking-wider mb-3 opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
                FOR PILOTS
              </div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 600, color: 'var(--cirro-primary)' }}>
                Fly Connected
              </h3>
              <p className="mb-6 opacity-70" style={{ color: 'var(--cirro-secondary)' }}>
                Access mission tools, telemetry, and workflows through a unified platform.
              </p>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all"
                style={{ backgroundColor: 'var(--cirro-primary)' }}
              >
                Request Beta Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'radial-gradient(circle at top right, rgba(49, 100, 130, 0.1) 0%, transparent 70%)'
              }}
            />
          </motion.div>

          {/* Developer CTA */}
          <motion.div
            className="group relative p-10 rounded-2xl overflow-hidden cursor-pointer"
            style={{ 
              backgroundColor: 'rgba(130, 85, 35, 0.05)',
              border: '1px solid rgba(130, 85, 35, 0.2)'
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <div className="text-sm tracking-wider mb-3 opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
                FOR DEVELOPERS
              </div>
              <h3 className="text-2xl mb-4" style={{ fontWeight: 600, color: 'var(--cirro-tertiary)' }}>
                Build for More
              </h3>
              <p className="mb-6 opacity-70" style={{ color: 'var(--cirro-secondary)' }}>
                Create apps that work across drone platforms with unified APIs and tooling.
              </p>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all"
                style={{ backgroundColor: 'var(--cirro-tertiary)' }}
              >
                Request Beta Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'radial-gradient(circle at top right, rgba(130, 85, 35, 0.1) 0%, transparent 70%)'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
