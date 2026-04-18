import { useState } from 'react';
import { runAiFlow } from '../../services/flowService';

const SYSTEM_PROMPT =
  'You are a helpful AI assistant.\n' +
  'Your job is to give clear, concise, and correct answers.\n' +
  'If something is unclear, make a reasonable assumption and continue.\n' +
  'Do not mention that you are an AI.';

export function AiChat() {
  const [userPrompt, setUserPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!userPrompt.trim()) return;
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const result = await runAiFlow({ userPrompt, systemPrompt: SYSTEM_PROMPT });
      setResponse(result.message);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontWeight: 600, fontSize: 14 }}>AI Assistant</div>

      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Ask anything…"
        rows={3}
        style={{
          width: '100%',
          resize: 'vertical',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.05)',
          color: 'var(--text-primary)',
          fontSize: 13,
          fontFamily: 'inherit',
          boxSizing: 'border-box',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !userPrompt.trim()}
        style={{
          alignSelf: 'flex-end',
          padding: '8px 20px',
          borderRadius: 'var(--radius-sm)',
          background: loading ? 'var(--text-muted)' : 'var(--accent-primary)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 13,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s',
        }}
      >
        {loading ? 'Thinking…' : 'Send'}
      </button>

      {error && (
        <div style={{ fontSize: 12, color: '#f87171', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(248,113,113,0.1)' }}>
          {error}
        </div>
      )}

      {response && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.04)',
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {response}
        </div>
      )}
    </div>
  );
}
