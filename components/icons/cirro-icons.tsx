import type { CSSProperties, ReactNode } from "react";

export type CirroIconProps = {
  className?: string;
  size?: number;
  style?: CSSProperties;
};

function BaseIcon({
  children,
  className = "",
  size = 48,
  style,
  viewBox = "0 0 48 48",
}: CirroIconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      strokeLinejoin="round"
      strokeLinecap="round"
      style={style}
      viewBox={viewBox}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function DroneIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="8" rx="2" stroke="currentColor" strokeWidth="2" width="12" x="18" y="20" />
      <line stroke="currentColor" strokeWidth="2" x1="18" x2="8" y1="22" y2="12" />
      <line stroke="currentColor" strokeWidth="2" x1="30" x2="40" y1="22" y2="12" />
      <line stroke="currentColor" strokeWidth="2" x1="18" x2="8" y1="26" y2="36" />
      <line stroke="currentColor" strokeWidth="2" x1="30" x2="40" y1="26" y2="36" />
      <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="36" r="4" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function AppIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="36" rx="4" stroke="currentColor" strokeWidth="2" width="36" x="6" y="6" />
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="10" x="12" y="12" />
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="10" x="26" y="12" />
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="10" x="12" y="26" />
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="10" x="26" y="26" />
    </BaseIcon>
  );
}

export function DataIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 14v4M24 12v4M36 14v4M12 26v4M24 24v4M36 26v4" stroke="currentColor" strokeWidth="2" />
      <rect height="32" rx="3" stroke="currentColor" strokeWidth="2" width="32" x="8" y="8" />
      <line stroke="currentColor" strokeWidth="2" x1="8" x2="40" y1="20" y2="20" />
      <line stroke="currentColor" strokeWidth="2" x1="8" x2="40" y1="32" y2="32" />
    </BaseIcon>
  );
}

export function DatabaseIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="24" cy="12" rx="16" ry="6" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12v24c0 4 7.2 6 16 6s16-2 16-6V12" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="16" ry="6" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="36" rx="16" ry="6" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function CloudApiIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M36 20c4 0 6 3 6 6s-2 6-6 6H14c-4 0-6-3-6-6s2-6 6-6c0-4 2.7-6 6-6 0-4 3-6 8-6s8 3 8 6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M18 22l-2 2 2 2M30 22l2 2-2 2M26 21l-4 6" stroke="currentColor" strokeWidth="1.5" />
    </BaseIcon>
  );
}

export function RemoteControlIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M12 14h24c5.5 0 10 4.5 10 10v7c0 5.5-4.5 10-10 10h-5c-1.4 0-2.7-.6-3.7-1.7L24 35l-3.3 4.3c-1 1.1-2.3 1.7-3.7 1.7h-5C6.5 41 2 36.5 2 31v-7c0-5.5 4.5-10 10-10Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M24 14V9.5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="27" r="5.2" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="27" r="5.2" stroke="currentColor" strokeWidth="2.5" />
    </BaseIcon>
  );
}

export function GroundStationIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="22" rx="2" stroke="currentColor" strokeWidth="2" width="32" x="8" y="8" />
      <line stroke="currentColor" strokeWidth="2" x1="4" x2="44" y1="36" y2="36" />
      <line stroke="currentColor" strokeWidth="2" x1="12" x2="12" y1="30" y2="36" />
      <line stroke="currentColor" strokeWidth="2" x1="36" x2="36" y1="30" y2="36" />
      <path d="M14 14l4 6 6-4 6 6 4-4" stroke="currentColor" strokeWidth="1.5" />
    </BaseIcon>
  );
}

export function WorkflowIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="36" r="6" stroke="currentColor" strokeWidth="2" />
      <line stroke="currentColor" strokeWidth="2" x1="17" x2="21" y1="15" y2="32" />
      <line stroke="currentColor" strokeWidth="2" x1="27" x2="31" y1="32" y2="15" />
    </BaseIcon>
  );
}

export function ServicesIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="28" x="10" y="8" />
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="28" x="10" y="20" />
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="2" width="28" x="10" y="32" />
      <circle cx="16" cy="13" fill="currentColor" r="1.5" />
      <circle cx="16" cy="25" fill="currentColor" r="1.5" />
      <circle cx="16" cy="37" fill="currentColor" r="1.5" />
    </BaseIcon>
  );
}

export function DashboardIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="36" rx="3" stroke="currentColor" strokeWidth="2" width="36" x="6" y="6" />
      <line stroke="currentColor" strokeWidth="2" x1="6" x2="42" y1="16" y2="16" />
      <rect height="8" rx="1" stroke="currentColor" strokeWidth="1.5" width="10" x="12" y="22" />
      <rect height="8" rx="1" stroke="currentColor" strokeWidth="1.5" width="10" x="26" y="22" />
      <rect height="4" rx="1" stroke="currentColor" strokeWidth="1.5" width="24" x="12" y="32" />
    </BaseIcon>
  );
}

export function ApiIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 12 8 24l8 12M32 12l8 12-8 12M28 10l-8 28" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function DownloadArrowIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M24 10v16" stroke="currentColor" strokeWidth="2" />
      <path d="m17 20 7 7 7-7" stroke="currentColor" strokeWidth="2" />
      <path d="M11 32v6c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3v-6" stroke="currentColor" strokeWidth="2" />
      <path d="M14 37h20" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function UsbCableIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M12 10h8v12h-8v10c0 5.5 4.5 10 10 10h4c5.5 0 10-4.5 10-10V18h-8"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect height="12" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="10" y="6" />
      <rect height="14" rx="2" stroke="currentColor" strokeWidth="2.5" width="12" x="30" y="12" />
      <path d="M34 26v6M38 26v6" stroke="currentColor" strokeWidth="2.5" />
    </BaseIcon>
  );
}

export function UsbSymbolIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="24" cy="36" fill="currentColor" r="3" stroke="none" />
      <circle cx="17" cy="18" fill="currentColor" r="2.2" stroke="none" />
      <path d="M24 33V15" stroke="currentColor" strokeWidth="2.6" />
      <path d="M24 15l-3.4 4.5h2.2v7.5h2.4v-7.5h2.2L24 15Z" fill="currentColor" stroke="none" />
      <path d="M24 24 17 18" stroke="currentColor" strokeWidth="2.6" />
      <path d="M24 27 31 20" stroke="currentColor" strokeWidth="2.6" />
      <path d="M31 16h4v4h-4z" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function LightningBoltIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M28.5 6 12 26.2h9.1L18.9 42 35.8 20.8h-9.2L28.5 6Z"
        fill="currentColor"
        stroke="none"
      />
    </BaseIcon>
  );
}

export function CloudInteractionIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M36 19c3.9 0 6 2.9 6 6.1 0 3.5-2.3 6.4-6.5 6.4H12.6C8.1 31.5 6 28.7 6 25.2c0-3.3 2.2-6.2 6-6.2.4-4.1 3.5-7 7.6-7 1.5 0 2.9.4 4.1 1.1 1.7-3.2 5-5.1 8.7-5.1 5.2 0 9.4 4 9.6 9"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M24 18v10" stroke="currentColor" strokeWidth="2.5" />
      <path d="m20 22 4-4 4 4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 28v-8" stroke="currentColor" strokeDasharray="2 3" strokeWidth="2.5" />
      <path d="m12 24 4 4 4-4" stroke="currentColor" strokeWidth="2.5" />
    </BaseIcon>
  );
}

export function NetworkIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="38" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="38" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
      <line stroke="currentColor" strokeWidth="2" x1="14" x2="20" y1="12" y2="22" />
      <line stroke="currentColor" strokeWidth="2" x1="34" x2="28" y1="12" y2="22" />
      <line stroke="currentColor" strokeWidth="2" x1="14" x2="20" y1="36" y2="26" />
      <line stroke="currentColor" strokeWidth="2" x1="34" x2="28" y1="36" y2="26" />
    </BaseIcon>
  );
}

export function MissionPathIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 36c0-4.4 3.6-8 8-8h6c4.4 0 8 3.6 8 8" stroke="currentColor" strokeWidth="2" />
      <path d="M16 13c4 5 9 7 16 7" stroke="currentColor" strokeDasharray="3 3" strokeWidth="2" />
    </BaseIcon>
  );
}

export function TelemetryWaveIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 28h6l4-10 6 20 5-14 4 8h11" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12c2 0 2 4 4 4s2-4 4-4 2 4 4 4 2-4 4-4 2 4 4 4 2-4 4-4 2 4 4 4" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function PackageDeployIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M24 6 10 14v20l14 8 14-8V14L24 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 6v36M10 14l14 8 14-8" stroke="currentColor" strokeWidth="2" />
      <path d="M24 24h10M30 18l6 6-6 6" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function SessionLogIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="32" rx="4" stroke="currentColor" strokeWidth="2" width="24" x="12" y="8" />
      <path d="M19 8h10v6H19z" stroke="currentColor" strokeWidth="2" />
      <line stroke="currentColor" strokeWidth="2" x1="18" x2="30" y1="20" y2="20" />
      <line stroke="currentColor" strokeWidth="2" x1="18" x2="30" y1="27" y2="27" />
      <line stroke="currentColor" strokeWidth="2" x1="18" x2="26" y1="34" y2="34" />
    </BaseIcon>
  );
}

export function SafetyShieldIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M24 6 11 11v11c0 9.2 5.4 15.7 13 20 7.6-4.3 13-10.8 13-20V11L24 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="m18 24 4 4 8-9" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

export function RuntimeStackIcon(props: CirroIconProps) {
  return (
    <BaseIcon {...props}>
      <rect height="8" rx="2" stroke="currentColor" strokeWidth="2" width="24" x="12" y="10" />
      <rect height="8" rx="2" stroke="currentColor" strokeWidth="2" width="30" x="9" y="20" />
      <rect height="8" rx="2" stroke="currentColor" strokeWidth="2" width="20" x="14" y="30" />
    </BaseIcon>
  );
}

export const ControllerIcon = RemoteControlIcon;
export const LaptopIcon = GroundStationIcon;
