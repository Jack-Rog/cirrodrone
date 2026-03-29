import { motion } from 'motion/react';
import { ArrowRight, Radio, Code2 } from 'lucide-react';

export function BetaAccessSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--cirro-neutral)] to-white" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 600 }}>
            Request early access
          </h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto" style={{ color: 'var(--cirro-secondary)' }}>
            Join the private beta and help shape the future of connected drone operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Pilot Beta Access */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative p-12 h-full"
              style={{ 
                backgroundColor: 'rgba(49, 100, 130, 0.05)',
                border: '2px solid rgba(49, 100, 130, 0.15)'
              }}
              whileHover={{ 
                borderColor: 'rgba(49, 100, 130, 0.3)',
                backgroundColor: 'rgba(49, 100, 130, 0.08)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--cirro-primary)',
                    boxShadow: '0 12px 32px rgba(49, 100, 130, 0.25)'
                  }}
                >
                  <Radio className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="mb-8">
                <div className="text-sm tracking-widest mb-4 opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
                  FOR PILOTS
                </div>
                <h3 
                  className="text-4xl mb-6"
                  style={{ fontWeight: 600, color: 'var(--cirro-primary)' }}
                >
                  Fly Connected
                </h3>
                <p 
                  className="text-lg leading-relaxed mb-6 opacity-80"
                  style={{ color: 'var(--cirro-secondary)' }}
                >
                  Get access to unified mission planning, real-time telemetry, and workflow tools that work across platforms.
                </p>
                
                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {[
                    'Cross-platform mission control',
                    'Real-time data streaming',
                    'Unified workflow management',
                    'Priority support',
                  ].map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-sm opacity-70"
                      style={{ color: 'var(--cirro-secondary)' }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 0.7, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--cirro-primary)' }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <motion.button
                className="flex items-center gap-3 px-8 py-4 rounded-xl text-white w-full justify-center group-hover:shadow-2xl transition-all"
                style={{ backgroundColor: 'var(--cirro-primary)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{ fontWeight: 600 }}>Request Pilot Access</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(49, 100, 130, 0.15) 0%, transparent 70%)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Developer Beta Access */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative p-12 h-full"
              style={{ 
                backgroundColor: 'rgba(130, 85, 35, 0.05)',
                border: '2px solid rgba(130, 85, 35, 0.15)'
              }}
              whileHover={{ 
                borderColor: 'rgba(130, 85, 35, 0.3)',
                backgroundColor: 'rgba(130, 85, 35, 0.08)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--cirro-tertiary)',
                    boxShadow: '0 12px 32px rgba(130, 85, 35, 0.25)'
                  }}
                >
                  <Code2 className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="mb-8">
                <div className="text-sm tracking-widest mb-4 opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
                  FOR DEVELOPERS
                </div>
                <h3 
                  className="text-4xl mb-6"
                  style={{ fontWeight: 600, color: 'var(--cirro-tertiary)' }}
                >
                  Build for More
                </h3>
                <p 
                  className="text-lg leading-relaxed mb-6 opacity-80"
                  style={{ color: 'var(--cirro-secondary)' }}
                >
                  Build apps and integrations that work across the entire drone ecosystem with unified APIs and SDKs.
                </p>
                
                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {[
                    'Unified REST & WebSocket APIs',
                    'Multi-platform SDKs',
                    'Developer documentation',
                    'Priority support',
                  ].map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-sm opacity-70"
                      style={{ color: 'var(--cirro-secondary)' }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 0.7, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--cirro-tertiary)' }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <motion.button
                className="flex items-center gap-3 px-8 py-4 rounded-xl text-white w-full justify-center group-hover:shadow-2xl transition-all"
                style={{ backgroundColor: 'var(--cirro-tertiary)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{ fontWeight: 600 }}>Request Developer Access</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(130, 85, 35, 0.15) 0%, transparent 70%)'
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-sm opacity-50" style={{ color: 'var(--cirro-secondary)' }}>
            Limited beta slots available • Rolling invitations • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
