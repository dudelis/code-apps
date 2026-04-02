import { GreetingHeader } from './GreetingHeader';
import { MetricsRow } from './MetricsRow';
import { BriefingCarousel } from './BriefingCarousel';
import { UpcomingHighlights } from './UpcomingHighlights';
import { PodcastPlayer } from './PodcastPlayer';

export function ExecutiveDashboard() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '0 16px 32px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <GreetingHeader />
        <MetricsRow />
        <BriefingCarousel />
        <UpcomingHighlights />
        <PodcastPlayer />
      </div>
    </div>
  );
}
