import { motion } from 'motion/react';

export function LogoCarousel() {
  const logos = [
    { name: 'DJI', width: 60 },
    { name: 'Parrot', width: 80 },
    { name: 'Autel', width: 70 },
    { name: 'Skydio', width: 75 },
    { name: 'PX4', width: 60 },
    { name: 'ArduPilot', width: 85 },
    { name: 'iNav', width: 65 },
  ];

  // Duplicate for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <div className="relative w-full py-12 overflow-hidden" style={{ backgroundColor: 'rgba(251, 251, 250, 0.5)' }}>
      <div className="text-center mb-8">
        <p className="text-sm tracking-wider opacity-50" style={{ color: 'var(--cirro-secondary)' }}>
          COMPATIBLE WITH LEADING PLATFORMS
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{
          background: 'linear-gradient(to right, rgba(251, 251, 250, 1), rgba(251, 251, 250, 0))'
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{
          background: 'linear-gradient(to left, rgba(251, 251, 250, 1), rgba(251, 251, 250, 0))'
        }} />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-16 items-center"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {allLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
              style={{ width: logo.width }}
            >
              <div 
                className="text-center text-lg tracking-wide"
                style={{ 
                  fontWeight: 600,
                  color: 'var(--cirro-secondary)'
                }}
              >
                {logo.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}