import { RoleSwitcher } from './RoleSwitcher';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { Avatar } from '../common/Avatar';

export function ShellBar() {
  const { user } = useCurrentUser();

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--shell-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        background: 'rgba(11,15,26,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>📋</span>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>
          Executive Briefing Manager
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <RoleSwitcher />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar
            initials={initials}
            color="var(--accent-primary)"
            photoUrl={user.photoDataUrl ?? undefined}
            size={30}
          />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{user.title}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
