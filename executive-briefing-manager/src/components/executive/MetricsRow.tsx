import { useDataContext } from '../../context';
import { MetricCard } from './MetricCard';

export function MetricsRow() {
  const { state } = useDataContext();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {state.metrics.map((m) => (
        <MetricCard key={m.id} metric={m} />
      ))}
    </div>
  );
}
