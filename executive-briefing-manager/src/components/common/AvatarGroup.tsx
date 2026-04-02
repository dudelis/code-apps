import { Avatar } from './Avatar';
import type { Contact } from '../../types';

interface AvatarGroupProps {
  contacts: Contact[];
  max?: number;
  size?: number;
  onAvatarClick?: (contactId: string) => void;
}

export function AvatarGroup({ contacts, max = 4, size = 32, onAvatarClick }: AvatarGroupProps) {
  const visible = contacts.slice(0, max);
  const overflow = contacts.length - max;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {visible.map((c, i) => (
        <div key={c.id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: visible.length - i }}>
          <Avatar
            initials={c.avatarInitials}
            color={c.avatarColor}
            photoUrl={c.photoUrl}
            size={size}
            onClick={onAvatarClick ? () => onAvatarClick(c.id) : undefined}
            title={c.name}
          />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            marginLeft: -8,
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'var(--bg-elevated)',
            border: '2px solid var(--bg-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.35,
            color: 'var(--text-secondary)',
            fontWeight: 600,
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
