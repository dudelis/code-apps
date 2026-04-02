import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { GlassPanel } from '../common/GlassPanel';

export function PodcastPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <GlassPanel style={{ padding: '16px 20px' }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
        🎙️ Now Playing
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Executive Briefing Podcast</div>
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 14 }}>
        Ep. 42 · DACH Market Insights · 18 min
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 2, marginBottom: 14, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '35%', background: 'var(--accent-primary)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-primary)' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>6:18</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ color: 'var(--text-secondary)' }}><SkipBack size={16} /></button>
          <button
            onClick={() => setPlaying((v) => !v)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--accent-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button style={{ color: 'var(--text-secondary)' }}><SkipForward size={16} /></button>
        </div>
        <button style={{ color: 'var(--text-secondary)' }}><Volume2 size={16} /></button>
      </div>
    </GlassPanel>
  );
}
