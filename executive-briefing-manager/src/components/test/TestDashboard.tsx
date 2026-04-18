import { useState } from 'react';
import { runTestFlow } from '../../services/flowService';

export function TestDashboard() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleRun() {
    setLoading(true);
    setIsError(false);
    setOutput('');
    try {
      const result = await runTestFlow({ input1, input2 });
      setOutput(result.output ?? JSON.stringify(result));
    } catch (err) {
      setIsError(true);
      setOutput(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '40px 24px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          Power Automate Test
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 32 }}>
          Enter values and run the flow to see the response.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={labelStyle}>input1</label>
            <input
              type="text"
              value={input1}
              onChange={e => setInput1(e.target.value)}
              placeholder="Enter input 1"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>input2</label>
            <input
              type="text"
              value={input2}
              onChange={e => setInput2(e.target.value)}
              placeholder="Enter input 2"
              style={inputStyle}
            />
          </div>

          <button
            onClick={handleRun}
            disabled={loading || (!input1 && !input2)}
            style={{
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              background: loading ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              alignSelf: 'flex-start',
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Running…' : 'Run Flow'}
          </button>

          <div>
            <label style={labelStyle}>Output</label>
            <textarea
              readOnly
              value={loading ? 'Running…' : output}
              placeholder="Output will appear here after running the flow…"
              style={{
                ...inputStyle,
                height: 140,
                resize: 'vertical',
                fontFamily: 'monospace',
                fontSize: 13,
                color: isError ? '#f87171' : 'var(--text-primary)',
                cursor: 'default',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 6,
  color: 'var(--text-muted)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  fontSize: 14,
  borderRadius: 'var(--radius-sm)',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  outline: 'none',
  boxSizing: 'border-box',
};
