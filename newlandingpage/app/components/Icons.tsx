// Custom wireframe icons for Cirro
interface IconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function DroneIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Main body */}
      <rect x="18" y="20" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Arms */}
      <line x1="18" y1="22" x2="8" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="22" x2="40" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="26" x2="8" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="26" x2="40" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Propellers */}
      <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function AppIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="12" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="26" y="12" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="26" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="26" y="26" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function DataIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M 12 14 L 12 18 M 24 12 L 24 16 M 36 14 L 36 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 12 26 L 12 30 M 24 24 L 24 28 M 36 26 L 36 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="8" y="8" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="32" x2="40" y2="32" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function DatabaseIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <ellipse cx="24" cy="12" rx="16" ry="6" stroke="currentColor" strokeWidth="2" />
      <path d="M 8 12 L 8 36 Q 8 42, 24 42 Q 40 42, 40 36 L 40 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="24" cy="24" rx="16" ry="6" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="36" rx="16" ry="6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CloudApiIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Cloud */}
      <path d="M 36 20 Q 42 20, 42 26 Q 42 32, 36 32 L 14 32 Q 8 32, 8 26 Q 8 20, 14 20 Q 14 14, 20 14 Q 20 8, 28 8 Q 36 8, 36 14 Q 36 20, 36 20 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* API symbols */}
      <path d="M 18 22 L 16 24 L 18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 30 22 L 32 24 L 30 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="26" y1="21" x2="22" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RemoteControlIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
      {/* Left joystick */}
      <circle cx="16" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
      {/* Right buttons */}
      <circle cx="32" cy="20" r="2" fill="currentColor" />
      <circle cx="32" cy="28" r="2" fill="currentColor" />
      <circle cx="28" cy="24" r="2" fill="currentColor" />
      <circle cx="36" cy="24" r="2" fill="currentColor" />
      {/* Antennas */}
      <line x1="12" y1="36" x2="12" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="36" x2="36" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GroundStationIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Laptop screen */}
      <rect x="8" y="8" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Base */}
      <line x1="4" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Support legs */}
      <line x1="12" y1="30" x2="12" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="30" x2="36" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Screen content - map/grid */}
      <path d="M 14 14 L 18 20 L 24 16 L 30 22 L 34 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function AppstoreIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="28" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="28" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function WorkflowIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="36" r="6" stroke="currentColor" strokeWidth="2" />
      <line x1="17" y1="15" x2="21" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="32" x2="31" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ServicesIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Server racks */}
      <rect x="10" y="8" width="28" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="20" width="28" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="32" width="28" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Indicator lights */}
      <circle cx="16" cy="13" r="1.5" fill="currentColor" />
      <circle cx="16" cy="25" r="1.5" fill="currentColor" />
      <circle cx="16" cy="37" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ApiIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M 16 12 L 8 24 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 32 12 L 40 24 L 32 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="10" x2="20" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function NetworkIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="38" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="38" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="12" x2="20" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="12" x2="28" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="36" x2="20" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="36" x2="28" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloudIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M 36 20 Q 42 20, 42 26 Q 42 32, 36 32 L 14 32 Q 8 32, 8 26 Q 8 20, 14 20 Q 14 14, 20 14 Q 20 8, 28 8 Q 36 8, 36 14 Q 36 20, 36 20 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToolingIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M 29.4 12.6 L 35.4 18.6 L 18 36 L 12 36 L 12 30 L 29.4 12.6 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="16" x2="32" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M 36 8 L 40 12 L 36 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardIcon({ className = "", size = 48, style = {} }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="6" y1="16" x2="42" y2="16" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="22" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="26" y="22" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="32" width="24" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Legacy names for backward compatibility
export const LaptopIcon = GroundStationIcon;
export const ControllerIcon = RemoteControlIcon;
