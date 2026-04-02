import type { MeetingPhase } from '../../types';
import { PHASE_LABELS, PHASE_ORDER } from '../../utils/formatters';

interface MeetingPhaseBarProps {
  currentPhase: MeetingPhase;
}

export function MeetingPhaseBar({ currentPhase }: MeetingPhaseBarProps) {
  const currentIndex = PHASE_ORDER.indexOf(currentPhase);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 40px',
        borderTop: '1px solid var(--border)',
        gap: 0,
        flexShrink: 0,
      }}
    >
      {PHASE_ORDER.map((phase, i) => {
        const isActive = i === currentIndex;
        const isDone = i < currentIndex;

        return (
          <div key={phase} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: isDone ? 'var(--accent-green)' : isActive ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                  border: isActive ? '2px solid var(--accent-primary)' : '2px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: isDone || isActive ? '#fff' : 'var(--text-muted)',
                  flexShrink: 0,
                }}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 10, color: isActive ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {PHASE_LABELS[phase]}
              </span>
            </div>
            {i < PHASE_ORDER.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: isDone ? 'var(--accent-green)' : 'var(--border)',
                  marginBottom: 20,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
