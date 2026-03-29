import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Users, Code } from 'lucide-react';
import { useState, useRef } from 'react';
import { CirroLogo } from './CirroLogo';
import { DroneIcon, AppIcon, DataIcon, DatabaseIcon, CloudApiIcon, ServicesIcon, WorkflowIcon } from './Icons';
import { LogoCarousel } from './LogoCarousel';

interface NodeData {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
  details: string[];
  baseX: number;
  baseY: number;
}

export function HeroVariantA() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ecosystemNodes: NodeData[] = [
    { 
      id: 'apps', 
      label: 'Apps', 
      icon: AppIcon, 
      color: 'var(--cirro-tertiary)',
      description: 'Application Layer',
      details: ['Mission planning', 'Flight control', 'Real-time monitoring', 'Data analysis'],
      baseX: 750,
      baseY: 100,
    },
    { 
      id: 'workflows', 
      label: 'Workflows', 
      icon: WorkflowIcon, 
      color: 'var(--cirro-tertiary)',
      description: 'Process Automation',
      details: ['Automated missions', 'Data pipelines', 'Alerts', 'Integrations'],
      baseX: 850,
      baseY: 180,
    },
    { 
      id: 'cloudApi', 
      label: 'Cloud', 
      icon: CloudApiIcon, 
      color: 'var(--cirro-tertiary)',
      description: 'Cloud Services',
      details: ['REST APIs', 'WebSocket streams', 'Authentication', 'Rate limiting'],
      baseX: 880,
      baseY: 280,
    },
    { 
      id: 'data', 
      label: 'Data', 
      icon: DataIcon, 
      color: 'var(--cirro-tertiary)',
      description: 'Data Management',
      details: ['Telemetry streams', 'Flight logs', 'Analytics', 'Storage'],
      baseX: 850,
      baseY: 370,
    },
    { 
      id: 'database', 
      label: 'Storage', 
      icon: DatabaseIcon, 
      color: 'var(--cirro-tertiary)',
      description: 'Data Storage',
      details: ['Flight records', 'User data', 'Telemetry history', 'Media assets'],
      baseX: 750,
      baseY: 420,
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: ServicesIcon, 
      color: 'var(--cirro-tertiary)',
      description: 'Backend Services',
      details: ['Third-party apps', 'Marketplace', 'Plugins', 'Extensions'],
      baseX: 650,
      baseY: 390,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--cirro-neutral)] via-white to-[var(--cirro-neutral)]" />
      
      {/* Subtle animated background */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, var(--cirro-primary) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Logo and hero content */}
        <div className="text-center mb-16">
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CirroLogo size={100} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: 'var(--cirro-secondary)' }}
          >
            Connect your drone hardware into a wider network of apps, workflows, and integrations.
            One connection. Infinite possibilities.
          </motion.p>
        </div>

        {/* Interactive ecosystem graph */}
        <motion.div
          ref={containerRef}
          className="relative h-[550px] mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          onMouseMove={handleMouseMove}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 550">
            <defs>
              <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--cirro-primary)', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: 'var(--cirro-primary)', stopOpacity: 0.7 }} />
              </linearGradient>
              <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--cirro-tertiary)', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: 'var(--cirro-tertiary)', stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>

            {/* Stable bridge from Drone to Cirro */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {/* Bridge base - thick stable connection */}
              <motion.path
                d="M 180 275 L 420 275"
                stroke="url(#bridgeGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
              {/* Bridge support lines */}
              <motion.path
                d="M 180 268 L 420 268"
                stroke="var(--cirro-primary)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.1 }}
              />
              <motion.path
                d="M 180 282 L 420 282"
                stroke="var(--cirro-primary)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.1 }}
              />
            </motion.g>
            
            {/* Simple lines from Cirro to ecosystem nodes */}
            {ecosystemNodes.map((node, i) => {
              const isHovered = hoveredNode === node.id;
              
              return (
                <motion.line
                  key={node.id}
                  x1="580"
                  y1="275"
                  x2={node.baseX}
                  y2={node.baseY}
                  stroke="url(#nodeGradient)"
                  strokeWidth={isHovered ? "4" : "2.5"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isHovered ? 0.8 : 0.5,
                  }}
                  transition={{ 
                    pathLength: { duration: 1, delay: 1.5 + i * 0.1 },
                    opacity: { duration: 0.3 }
                  }}
                />
              );
            })}
          </svg>

          {/* Drone node (left) */}
          <motion.div
            className="absolute cursor-pointer"
            style={{ left: 120, top: 220 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onHoverStart={() => setHoveredNode('drone')}
            onHoverEnd={() => setHoveredNode(null)}
            onClick={() => setSelectedNode(selectedNode === 'drone' ? null : 'drone')}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="relative w-32 h-32 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 8px 32px rgba(49, 100, 130, 0.25)',
                border: '3px solid rgba(49, 100, 130, 0.3)'
              }}
            >
              <DroneIcon size={56} style={{ color: 'var(--cirro-primary)' }} />
              <div className="mt-2 text-center">
                <div className="text-sm" style={{ fontWeight: 600, color: 'var(--cirro-primary)' }}>
                  Drone
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Cirro orchestration layer (center) */}
          <motion.div
            className="absolute cursor-pointer"
            style={{ left: 450, top: 200 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            onHoverStart={() => setHoveredNode('cirro')}
            onHoverEnd={() => setHoveredNode(null)}
            onClick={() => setSelectedNode(selectedNode === 'cirro' ? null : 'cirro')}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                rotate: hoveredNode === 'cirro' ? 360 : 0,
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: hoveredNode === 'cirro' ? Infinity : 0,
              }}
            >
              <div className="w-48 h-48 rounded-full border-2 opacity-10"
                   style={{ borderColor: 'var(--cirro-primary)' }} />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-44 h-44 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm"
                   style={{ 
                     backgroundColor: 'white',
                     boxShadow: '0 12px 48px rgba(49, 100, 130, 0.3)',
                     border: '3px solid rgba(49, 100, 130, 0.4)'
                   }}>
                <CirroLogo size={90} />
                <div className="mt-2 text-center">
                  <div className="text-xs" style={{ fontWeight: 600, color: 'var(--cirro-primary)' }}>
                    Platform
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Ecosystem nodes with gravity effect */}
          {ecosystemNodes.map((node, i) => {
            // Calculate distance from mouse to node
            const nodeX = useTransform(mouseX, (mx) => {
              const distance = Math.sqrt(Math.pow(mx - node.baseX, 2) + Math.pow(mouseY.get() - node.baseY, 2));
              const pullStrength = Math.max(0, 120 - distance) / 120;
              const offset = selectedNode && selectedNode !== node.id ? -60 : pullStrength * 15;
              return node.baseX + offset;
            });

            const nodeY = useTransform(mouseY, (my) => {
              const distance = Math.sqrt(Math.pow(mouseX.get() - node.baseX, 2) + Math.pow(my - node.baseY, 2));
              const pullStrength = Math.max(0, 120 - distance) / 120;
              const offset = selectedNode && selectedNode !== node.id ? -60 : pullStrength * 15;
              return node.baseY + offset;
            });

            // Apply spring physics for smooth gravity return
            const springX = useSpring(nodeX, { stiffness: 180, damping: 18 });
            const springY = useSpring(nodeY, { stiffness: 180, damping: 18 });
            
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const shouldPushBack = selectedNode && selectedNode !== node.id;

            return (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer"
                style={{ 
                  left: springX,
                  top: springY,
                  x: '-50%',
                  y: '-50%',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isSelected ? 1.15 : (isHovered ? 1.1 : 1),
                  opacity: shouldPushBack ? 0.3 : 1,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                  delay: 1.6 + i * 0.08 
                }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <motion.div
                  className="w-28 h-28 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm gap-1"
                  style={{ 
                    backgroundColor: 'white',
                    boxShadow: isHovered || isSelected 
                      ? '0 12px 32px rgba(130, 85, 35, 0.4)' 
                      : '0 6px 16px rgba(130, 85, 35, 0.2)',
                    border: `2px solid rgba(130, 85, 35, ${isHovered || isSelected ? 0.5 : 0.3})`
                  }}
                >
                  <node.icon size={42} style={{ color: 'var(--cirro-tertiary)' }} />
                  <div className="text-xs text-center" style={{ fontWeight: 600, color: 'var(--cirro-tertiary)' }}>
                    {node.label}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Side panel for node details */}
        {selectedNode && (
          <motion.div
            className="fixed right-8 top-1/2 -translate-y-1/2 w-80 p-6 rounded-2xl backdrop-blur-xl z-50"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(49, 100, 130, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {(() => {
              const node = ecosystemNodes.find(n => n.id === selectedNode);
              if (!node) return null;
              
              return (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(130, 85, 35, 0.1)' }}
                    >
                      <node.icon size={32} style={{ color: node.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl" style={{ fontWeight: 600, color: node.color }}>
                        {node.label}
                      </h3>
                      <p className="text-sm opacity-60" style={{ color: 'var(--cirro-secondary)' }}>
                        {node.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {node.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(130, 85, 35, 0.05)' }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                        <span style={{ color: 'var(--cirro-secondary)' }}>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="mt-4 text-sm opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--cirro-secondary)' }}
                  >
                    Close
                  </button>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* Logo carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <LogoCarousel />
        </motion.div>

        {/* Dual CTA cards - with iconography */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {/* Pilot CTA */}
          <motion.div
            className="group relative p-10 rounded-2xl overflow-hidden cursor-pointer"
            style={{ 
              backgroundColor: 'var(--cirro-primary)',
              boxShadow: '0 12px 48px rgba(49, 100, 130, 0.3)'
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(49, 100, 130, 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-white" />
                <div className="text-sm tracking-wider text-white opacity-80">
                  FOR PILOTS
                </div>
              </div>
              <h3 className="text-2xl mb-4 text-white" style={{ fontWeight: 600 }}>
                Fly Connected
              </h3>
              <p className="mb-6 text-white opacity-90">
                Access mission tools, telemetry, and workflows through a unified platform.
              </p>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all bg-white"
                style={{ color: 'var(--cirro-primary)', fontWeight: 600 }}
              >
                Request Beta Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Developer CTA */}
          <motion.div
            className="group relative p-10 rounded-2xl overflow-hidden cursor-pointer"
            style={{ 
              backgroundColor: 'var(--cirro-tertiary)',
              boxShadow: '0 12px 48px rgba(130, 85, 35, 0.3)'
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(130, 85, 35, 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-8 h-8 text-white" />
                <div className="text-sm tracking-wider text-white opacity-80">
                  FOR DEVELOPERS
                </div>
              </div>
              <h3 className="text-2xl mb-4 text-white" style={{ fontWeight: 600 }}>
                Build for More
              </h3>
              <p className="mb-6 text-white opacity-90">
                Create apps that work across drone platforms with unified APIs and tooling.
              </p>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all bg-white"
                style={{ color: 'var(--cirro-tertiary)', fontWeight: 600 }}
              >
                Request Beta Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
