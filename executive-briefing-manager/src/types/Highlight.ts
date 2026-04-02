export type HighlightType = 'risk' | 'opportunity' | 'action' | 'insight';

export interface Highlight {
  id: string;
  title: string;
  description: string;
  type: HighlightType;
  meetingId?: string;
  priority: number;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
}
