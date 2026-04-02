import type { Contact } from '../../../types';
import { Popover } from '../../common/Popover';
import { Avatar } from '../../common/Avatar';
import { Badge } from '../../common/Badge';
import { MessageCircle } from 'lucide-react';

interface ProfileCardProps {
  contact: Contact;
}

export function ProfileCard({ contact }: ProfileCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={contact.avatarInitials} color={contact.avatarColor} photoUrl={contact.photoUrl} size={44} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{contact.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{contact.role}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{contact.company}</div>
        </div>
      </div>

      <Badge label={contact.technicalStance} variant={contact.technicalStance} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {contact.interests.map((interest) => (
          <span
            key={interest}
            style={{ fontSize: 10, padding: '2px 7px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, color: 'var(--text-muted)' }}
          >
            {interest}
          </span>
        ))}
      </div>

      <Popover
        trigger={
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-primary)',
              fontSize: 12,
              fontWeight: 500,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <MessageCircle size={13} />
            Smalltalk Topics
          </button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>
            💬 Conversation Starters
          </div>
          {contact.smalltalkTopics.map((topic) => (
            <div key={topic} style={{ fontSize: 12, color: 'var(--text-primary)', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              {topic}
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
}
