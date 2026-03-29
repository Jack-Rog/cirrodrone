import { motion } from 'motion/react';
import { DroneIcon, RemoteControlIcon, GroundStationIcon, CloudApiIcon, AppIcon, DatabaseIcon, ServicesIcon, DashboardIcon } from './Icons';
import { CirroLogo } from './CirroLogo';
import { Usb } from 'lucide-react';

export function HowCirroFits() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
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
            How <span style={{ color: 'var(--cirro-primary)' }}>Cirro</span> fits
          </h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto" style={{ color: 'var(--cirro-secondary)' }}>
            A single orchestration layer between your hardware and everything else
          </p>
        </motion.div>

        {/* Technical flow diagram */}
        <div className="relative max-w-6xl mx-auto min-h-[600px]">
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600">
            <defs>
              <linearGradient id="wireLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--cirro-primary)', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: 'var(--cirro-primary)', stopOpacity: 0.6 }} />
              </linearGradient>
              <linearGradient id="apiLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--cirro-tertiary)', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: 'var(--cirro-tertiary)', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>

            {/* Drone to Remote Control - wireless dashed */}
            <motion.path
              d="M 150 300 Q 200 300, 250 300"
              stroke="url(#wireLine)"
              strokeWidth="3"
              strokeDasharray="8 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Remote Control to Ground Station - USB solid */}
            <motion.line
              x1="350" y1="300" x2="450" y2="300"
              stroke="url(#wireLine)"
              strokeWidth="5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />

            {/* Ground Station to Cirro Platform - upward connection */}
            <motion.line
              x1="600" y1="300" x2="600" y2="180"
              stroke="url(#wireLine)"
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.1 }}
            />

            {/* Cirro API to Ecosystem nodes */}
            <motion.line
              x1="750" y1="140" x2="900" y2="100"
              stroke="url(#apiLine)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.4 }}
            />
            <motion.line
              x1="750" y1="140" x2="980" y2="160"
              stroke="url(#apiLine)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
            />
            <motion.line
              x1="750" y1="140" x2="980" y2="230"
              stroke="url(#apiLine)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.6 }}
            />
            <motion.line
              x1="750" y1="140" x2="900" y2="300"
              stroke="url(#apiLine)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.7 }}
            />
          </svg>

          <div className="relative py-16">
            {/* Hardware flow - horizontal */}
            <div className="flex items-center justify-start gap-12 mb-20">
              {/* Drone */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="w-28 h-28 rounded-xl border-3 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-primary)',
                    backgroundColor: 'rgba(49, 100, 130, 0.05)',
                    borderWidth: '3px'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(49, 100, 130, 0.1)' }}
                >
                  <DroneIcon size={56} style={{ color: 'var(--cirro-primary)' }} />
                </motion.div>
                <div className="text-center text-sm" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Drone</div>
                </div>
              </motion.div>

              <motion.div 
                className="text-3xl opacity-20" 
                style={{ color: 'var(--cirro-primary)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                ⟶
              </motion.div>

              {/* Remote Control */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="w-28 h-28 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-primary)',
                    backgroundColor: 'rgba(49, 100, 130, 0.05)'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(49, 100, 130, 0.1)' }}
                >
                  <RemoteControlIcon size={56} style={{ color: 'var(--cirro-primary)' }} />
                </motion.div>
                <div className="text-center text-sm" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Remote</div>
                </div>
              </motion.div>

              {/* USB Label */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg"
                     style={{ backgroundColor: 'rgba(49, 100, 130, 0.1)' }}>
                  <Usb className="w-5 h-5" style={{ color: 'var(--cirro-primary)' }} />
                  <span className="text-xs" style={{ color: 'var(--cirro-primary)', fontWeight: 600 }}>
                    USB
                  </span>
                </div>
                <div className="w-16 h-0.5 rounded" style={{ backgroundColor: 'var(--cirro-primary)', opacity: 0.3 }} />
              </motion.div>

              {/* Ground Station */}
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  className="w-32 h-32 rounded-xl border-3 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-primary)',
                    backgroundColor: 'rgba(49, 100, 130, 0.08)',
                    borderWidth: '3px'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(49, 100, 130, 0.15)' }}
                >
                  <GroundStationIcon size={64} style={{ color: 'var(--cirro-primary)' }} />
                </motion.div>
                <div className="text-center text-sm" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Ground Station</div>
                </div>
              </motion.div>
            </div>

            {/* Cirro Platform - Above ground station */}
            <motion.div
              className="absolute"
              style={{ left: '50%', top: '20px', transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                {/* Platform box */}
                <div 
                  className="w-56 h-36 rounded-2xl border-4 flex flex-col items-center justify-center backdrop-blur-sm relative"
                  style={{ 
                    borderColor: 'var(--cirro-primary)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 16px 56px rgba(49, 100, 130, 0.25)'
                  }}
                >
                  <CirroLogo size={60} />
                  <div className="mt-3 text-center">
                    <div className="text-base" style={{ fontWeight: 700, color: 'var(--cirro-primary)' }}>
                      CIRRO PLATFORM
                    </div>
                    <div className="text-xs opacity-60 mt-1" style={{ color: 'var(--cirro-secondary)' }}>
                      Orchestration Layer
                    </div>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 opacity-30"
                       style={{ borderColor: 'var(--cirro-primary)' }} />
                  <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 opacity-30"
                       style={{ borderColor: 'var(--cirro-primary)' }} />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 opacity-30"
                       style={{ borderColor: 'var(--cirro-primary)' }} />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 opacity-30"
                       style={{ borderColor: 'var(--cirro-primary)' }} />
                </div>

                {/* API label */}
                <motion.div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-6 px-5 py-2 rounded-lg whitespace-nowrap"
                  style={{ backgroundColor: 'rgba(130, 85, 35, 0.12)' }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <div className="text-sm" style={{ fontWeight: 700, color: 'var(--cirro-tertiary)' }}>
                    Exposes API →
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Ecosystem - Right side vertical layout */}
            <div className="absolute right-0 top-12 flex flex-col gap-6">
              {/* Cloud Storage */}
              <motion.div
                className="flex items-center gap-4 flex-row-reverse"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-tertiary)',
                    backgroundColor: 'rgba(130, 85, 35, 0.05)'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(130, 85, 35, 0.1)' }}
                >
                  <CloudApiIcon size={48} style={{ color: 'var(--cirro-tertiary)' }} />
                </motion.div>
                <div className="text-sm text-right" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Cloud</div>
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div
                className="flex items-center gap-4 flex-row-reverse"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-tertiary)',
                    backgroundColor: 'rgba(130, 85, 35, 0.05)'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(130, 85, 35, 0.1)' }}
                >
                  <AppIcon size={48} style={{ color: 'var(--cirro-tertiary)' }} />
                </motion.div>
                <div className="text-sm text-right" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Apps</div>
                </div>
              </motion.div>

              {/* Database */}
              <motion.div
                className="flex items-center gap-4 flex-row-reverse"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-tertiary)',
                    backgroundColor: 'rgba(130, 85, 35, 0.05)'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(130, 85, 35, 0.1)' }}
                >
                  <DatabaseIcon size={48} style={{ color: 'var(--cirro-tertiary)' }} />
                </motion.div>
                <div className="text-sm text-right" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Database</div>
                </div>
              </motion.div>

              {/* Dashboard */}
              <motion.div
                className="flex items-center gap-4 flex-row-reverse"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-xl border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    borderColor: 'var(--cirro-tertiary)',
                    backgroundColor: 'rgba(130, 85, 35, 0.05)'
                  }}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(130, 85, 35, 0.1)' }}
                >
                  <DashboardIcon size={48} style={{ color: 'var(--cirro-tertiary)' }} />
                </motion.div>
                <div className="text-sm text-right" style={{ color: 'var(--cirro-secondary)' }}>
                  <div style={{ fontWeight: 600 }}>Dashboard</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
               style={{ backgroundColor: 'rgba(49, 100, 130, 0.08)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--cirro-primary)' }} />
            <p className="text-sm" style={{ color: 'var(--cirro-secondary)', fontWeight: 600 }}>
              One integration point • Unified APIs • Cross-platform compatibility
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
