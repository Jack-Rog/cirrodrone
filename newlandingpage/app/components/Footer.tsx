import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { CirroLogo } from './CirroLogo';

export function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and tagline */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <CirroLogo size={60} />
            </div>
            <p className="text-sm opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
              The ecosystem layer for drones
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="text-sm mb-3 opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
              Questions about Cirro?
            </div>
            <a 
              href="mailto:hello@cirro.dev"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
              style={{ 
                backgroundColor: 'rgba(49, 100, 130, 0.08)',
                color: 'var(--cirro-primary)'
              }}
            >
              <Mail className="w-4 h-4" />
              <span style={{ fontWeight: 600 }}>hello@cirro.dev</span>
            </a>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex gap-6 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a 
              href="#"
              className="opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--cirro-secondary)' }}
            >
              Privacy
            </a>
            <a 
              href="#"
              className="opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--cirro-secondary)' }}
            >
              Terms
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center mt-12 pt-8 border-t"
          style={{ borderColor: 'rgba(0, 0, 0, 0.04)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-xs opacity-40" style={{ color: 'var(--cirro-secondary)' }}>
            © 2026 Cirro. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}