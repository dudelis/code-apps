import type { Meeting } from '../../../types';
import { useDataContext } from '../../../context';
import { Paperclip } from 'lucide-react';
import { Avatar } from '../../common/Avatar';

interface MailHubTabProps {
  meeting: Meeting;
}

export function MailHubTab({ meeting }: MailHubTabProps) {
  const { state, dispatch } = useDataContext();
  const emails = state.emails.filter((e) => meeting.emailIds.includes(e.id));

  return (
    <div style={{ padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => dispatch({ type: 'MARK_EMAIL_READ', payload: email.id })}
          style={{
            display: 'flex',
            gap: 14,
            padding: '14px 16px',
            borderRadius: 'var(--radius-sm)',
            background: email.read ? 'transparent' : 'rgba(99,102,241,0.06)',
            border: `1px solid ${email.read ? 'transparent' : 'rgba(99,102,241,0.15)'}`,
            cursor: 'pointer',
          }}
        >
          <Avatar initials={email.fromInitials} color="var(--accent-primary)" size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: email.read ? 500 : 700 }}>{email.from}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {email.hasAttachment && <Paperclip size={12} color="var(--text-muted)" />}
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{email.date}</span>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: email.read ? 400 : 600, marginBottom: 3 }}>{email.subject}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.preview}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
