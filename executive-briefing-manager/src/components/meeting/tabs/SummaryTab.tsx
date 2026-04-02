import { useState } from 'react';
import type { Meeting } from '../../../types';
import { Copy, Check } from 'lucide-react';

interface SummaryTabProps {
  meeting: Meeting;
}

export function SummaryTab({ meeting }: SummaryTabProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(meeting.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            🤖 AI Summary
          </span>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
              fontSize: 12, color: 'var(--text-secondary)',
            }}
          >
            {copied ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>{meeting.summary}</p>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          💡 AI Insights
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {meeting.aiInsights.map((insight, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 13, lineHeight: 1.5 }}>{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
