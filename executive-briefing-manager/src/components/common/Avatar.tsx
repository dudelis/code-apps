interface AvatarProps {
  initials: string;
  color: string;
  photoUrl?: string;
  size?: number;
  onClick?: () => void;
  title?: string;
}

export function Avatar({ initials, color, photoUrl, size = 36, onClick, title }: AvatarProps) {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.38,
    fontWeight: 600,
    color: '#fff',
    flexShrink: 0,
    cursor: onClick ? 'pointer' : 'default',
    border: '2px solid var(--bg-base)',
    userSelect: 'none' as const,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  };

  return (
    <div style={containerStyle} onClick={onClick} title={title ?? initials}>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={initials}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            borderRadius: '50%',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
