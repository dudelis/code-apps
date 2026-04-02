import type { Meeting } from '../../../types';
import { useDataContext } from '../../../context';
import { Avatar } from '../../common/Avatar';
import { Badge } from '../../common/Badge';

interface SocialInsightsTabProps {
  meeting: Meeting;
}

export function SocialInsightsTab({ meeting }: SocialInsightsTabProps) {
  const { state } = useDataContext();
  const participants = state.contacts.filter((c) => meeting.participantIds.includes(c.id));

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {participants.map((contact) => (
        <div key={contact.id} style={{ display: 'flex', gap: 16, padding: 16, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <Avatar initials={contact.avatarInitials} color={contact.avatarColor} size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{contact.name}</span>
              <Badge label={contact.technicalStance} variant={contact.technicalStance} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>{contact.role} · {contact.company}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Interests</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {contact.interests.map((i) => (
                <span key={i} style={{ fontSize: 11, padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, color: 'var(--text-secondary)' }}>{i}</span>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Smalltalk</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {contact.smalltalkTopics.map((t) => (
                <div key={t} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>💬 {t}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
