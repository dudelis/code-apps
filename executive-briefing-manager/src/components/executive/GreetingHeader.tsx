import { format } from 'date-fns';
import { Sun } from 'lucide-react';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export function GreetingHeader() {
  const { user } = useCurrentUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = format(new Date(), 'EEEE, MMMM d');
  const firstName = user.name.split(' ')[0];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Sun size={22} color="var(--accent-amber)" />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>{greeting}, {firstName}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{today}</div>
      </div>
    </div>
  );
}
