import { motion } from 'motion/react';
import { NetworkIcon, WorkflowIcon, ApiIcon } from './Icons';

export function WhyItMatters() {
  const values = [
    {
      icon: NetworkIcon,
      title: 'Unlock More',
      description: 'Get more from your drone hardware. Access capabilities beyond what a single platform can offer.',
      color: 'var(--cirro-primary)',
    },
    {
      icon: WorkflowIcon,
      title: 'Connect Richer',
      description: 'Integrate into workflows and systems that span mission planning, data processing, and backend services.',
      color: 'var(--cirro-secondary)',
    },
    {
      icon: ApiIcon,
      title: 'Build Broader',
      description: 'Create once, deploy across platforms. Build for the ecosystem, not individual drones.',
      color: 'var(--cirro-tertiary)',
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-white" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 600 }}>
            Why it matters
          </h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto" style={{ color: 'var(--cirro-secondary)' }}>
            The drone ecosystem is fragmented. Cirro brings it together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div
                className="relative p-10 rounded-3xl h-full"
                style={{ 
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.06)'
                }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: value.color,
                      boxShadow: `0 8px 24px ${value.color}40`
                    }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 
                  className="text-2xl mb-4"
                  style={{ fontWeight: 600, color: value.color }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-base leading-relaxed opacity-70"
                  style={{ color: 'var(--cirro-secondary)' }}
                >
                  {value.description}
                </p>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${value.color}08 0%, transparent 70%)`
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-xl opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
            A single drone becomes exponentially more valuable when connected through Cirro.
          </p>
        </motion.div>
      </div>
    </section>
  );
}