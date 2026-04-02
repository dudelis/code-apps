import { useState } from 'react';
import { useMeeting } from '../../hooks/useMeeting';
import { Modal } from '../common/Modal';
import { MeetingHeader } from './MeetingHeader';
import { MeetingPhaseBar } from './MeetingPhaseBar';
import { Tabs } from '../common/Tabs';
import { SummaryTab } from './tabs/SummaryTab';
import { TasksAITab } from './tabs/TasksAITab';
import { MailHubTab } from './tabs/MailHubTab';
import { SocialInsightsTab } from './tabs/SocialInsightsTab';
import { useDataContext } from '../../context';
import { FileText, CheckSquare, Mail, Users } from 'lucide-react';

const TABS = [
  { id: 'summary', label: 'Summary', icon: <FileText size={13} /> },
  { id: 'tasks', label: 'Tasks & AI', icon: <CheckSquare size={13} /> },
  { id: 'mail', label: 'Mail Hub', icon: <Mail size={13} /> },
  { id: 'social', label: 'Social Insights', icon: <Users size={13} /> },
];

export function MeetingOverlay() {
  const { activeMeeting, isOpen, closeMeeting } = useMeeting();
  const { state } = useDataContext();
  const [smalltalkContactId, setSmalltalkContactId] = useState<string | null>(null);

  const smalltalkContact = smalltalkContactId
    ? state.contacts.find((c) => c.id === smalltalkContactId)
    : null;

  if (!activeMeeting) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeMeeting}>
      <MeetingHeader meeting={activeMeeting} onAvatarClick={setSmalltalkContactId} />

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Tabs tabs={TABS}>
          {(activeId) => (
            <>
              {activeId === 'summary' && <SummaryTab meeting={activeMeeting} />}
              {activeId === 'tasks' && <TasksAITab meeting={activeMeeting} />}
              {activeId === 'mail' && <MailHubTab meeting={activeMeeting} />}
              {activeId === 'social' && <SocialInsightsTab meeting={activeMeeting} />}
            </>
          )}
        </Tabs>
      </div>

      <MeetingPhaseBar currentPhase={activeMeeting.phase} />

      {/* Smalltalk popover from avatar click */}
      {smalltalkContact && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setSmalltalkContactId(null)}
        >
          <div
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: 24, minWidth: 280, boxShadow: 'var(--shadow-lg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: 700, marginBottom: 12 }}>💬 {smalltalkContact.name}</div>
            {smalltalkContact.smalltalkTopics.map((t) => (
              <div key={t} style={{ fontSize: 13, padding: '6px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)' }}>{t}</div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
