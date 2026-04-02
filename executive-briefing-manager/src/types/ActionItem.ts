export type Priority = 'high' | 'medium' | 'low';

export interface ActionItem {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  meetingId: string;
  assigneeId?: string;
}
