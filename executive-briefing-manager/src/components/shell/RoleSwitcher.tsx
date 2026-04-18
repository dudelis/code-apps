import { useRole } from '../../hooks/useRole';
import { useAppContext } from '../../context/AppContext';
import type { Role } from '../../context/AppContext';

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const { state } = useAppContext();
  const isSystemAdmin = state.securityRoles.includes('System Administrator');

  const options: { value: Role; label: string }[] = [
    { value: 'officer', label: 'Customer Officer' },
    ...(isSystemAdmin ? [{ value: 'executive' as Role, label: 'Executive' }] : []),
    { value: 'test', label: 'Test' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 'var(--radius-sm)',
        padding: 3,
        gap: 2,
        border: '1px solid var(--border)',
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setRole(opt.value)}
          style={{
            padding: '5px 14px',
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 4,
            color: role === opt.value ? '#fff' : 'var(--text-muted)',
            background: role === opt.value ? 'var(--accent-primary)' : 'transparent',
            transition: 'all 0.15s',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
