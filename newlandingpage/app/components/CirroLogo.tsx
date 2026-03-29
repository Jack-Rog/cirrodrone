export function CirroLogo({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <img
      src="/brand/cirro-logo-full.png"
      alt="Cirro logo"
      className={className}
      style={{ width: size, height: 'auto' }}
    />
  );
}
