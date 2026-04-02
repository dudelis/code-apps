import { Crad2_ebmmeetingsService } from '../generated/services/Crad2_ebmmeetingsService';
import { Crad2_ebmcontactsService } from '../generated/services/Crad2_ebmcontactsService';
import { Crad2_ebmactionitemsService } from '../generated/services/Crad2_ebmactionitemsService';
import { Crad2_ebmweeklyhighlightsService } from '../generated/services/Crad2_ebmweeklyhighlightsService';
import { Crad2_ebmmailartifactsService } from '../generated/services/Crad2_ebmmailartifactsService';
import { Crad2_ebmsocialinsightsService } from '../generated/services/Crad2_ebmsocialinsightsService';
import { Crad2_ebmaudiobriefingsService } from '../generated/services/Crad2_ebmaudiobriefingsService';
import { Crad2_ebmmeetingparticipantsService } from '../generated/services/Crad2_ebmmeetingparticipantsService';
import type {
  Meeting, ActionItem, Contact, Highlight,
  KanbanStatus, Priority, MeetingPhase,
} from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'];
function hashColor(str: string): string {
  let h = 0;
  for (const c of str) h = (h << 5) - h + c.charCodeAt(0);
  return COLORS[Math.abs(h) % COLORS.length];
}

function mapKanban(phase: unknown): KanbanStatus {
  switch (phase as number) {
    case 100000001: return 'approved';
    case 100000002: return 'scheduled';
    case 100000003: return 'in-progress';
    case 100000004: return 'ready';
    case 100000005: return 'done';
    default: return 'inbox';
  }
}

function kanbanToPhase(k: KanbanStatus): MeetingPhase {
  const m: Record<KanbanStatus, MeetingPhase> = {
    inbox: 'discovery', approved: 'qualification', scheduled: 'proposal',
    'in-progress': 'negotiation', ready: 'closing', done: 'won',
  };
  return m[k];
}

function mapPriority(p: unknown): Priority {
  switch (p as number) {
    case 100000000: return 'high';
    case 100000002: return 'low';
    default: return 'medium';
  }
}

function splitDate(iso?: string): { date: string; time: string } {
  if (!iso) return { date: new Date().toISOString().slice(0, 10), time: '09:00' };
  const d = new Date(iso);
  return {
    date: d.toISOString().slice(0, 10),
    time: `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`,
  };
}

// ─── Meetings ─────────────────────────────────────────────────────────────────

export async function loadMeetingsFromDataverse(): Promise<Meeting[]> {
  const result = await Crad2_ebmmeetingsService.getAll({
    select: [
      'crad2_ebmmeetingid', 'crad2_name', 'crad2_company', 'crad2_industry',
      'crad2_startdatetime', 'crad2_enddatetime', 'crad2_phase',
      'crad2_summary', 'crad2_outlookeventid',
    ],
    filter: 'statecode eq 0',
    orderBy: ['crad2_startdatetime asc'],
  });
  if (!result.success || !result.data) return [];

  return result.data.map(r => {
    const status = mapKanban(r.crad2_phase);
    const { date, time: startTime } = splitDate(r.crad2_startdatetime);
    const { time: endTime } = splitDate(r.crad2_enddatetime);
    return {
      id: r.crad2_ebmmeetingid,
      title: r.crad2_name ?? 'Untitled Briefing',
      company: r.crad2_company ?? '',
      industry: r.crad2_industry ?? '',
      date,
      startTime,
      endTime,
      status,
      phase: kanbanToPhase(status),
      participantIds: [],
      actionItemIds: [],
      emailIds: [],
      color: hashColor(r.crad2_company ?? r.crad2_ebmmeetingid),
      summary: r.crad2_summary ?? '',
      aiInsights: [],
    };
  });
}

export async function updateMeetingPhase(id: string, status: KanbanStatus): Promise<void> {
  const phaseMap: Record<KanbanStatus, number> = {
    inbox: 100000000, approved: 100000001, scheduled: 100000002,
    'in-progress': 100000003, ready: 100000004, done: 100000005,
  };
  await Crad2_ebmmeetingsService.update(id, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crad2_phase: phaseMap[status] as any,
  });
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export async function loadContactsFromDataverse(): Promise<Contact[]> {
  const result = await Crad2_ebmcontactsService.getAll({
    select: [
      'crad2_ebmcontactid', 'crad2_name', 'crad2_role', 'crad2_company',
      'crad2_email', 'crad2_technicalstance',
      'crad2_personalinterests', 'crad2_professionalinterests', 'crad2_smalltalk',
    ],
    filter: 'statecode eq 0',
  });
  if (!result.success || !result.data) return [];

  return result.data.map(r => ({
    id: r.crad2_ebmcontactid,
    name: r.crad2_name ?? 'Unknown',
    role: r.crad2_role ?? '',
    company: r.crad2_company ?? '',
    technicalStance: (['champion', 'neutral', 'skeptic'].includes(r.crad2_technicalstance ?? '')
      ? r.crad2_technicalstance as 'champion' | 'neutral' | 'skeptic'
      : 'neutral'),
    interests: [
      ...(r.crad2_professionalinterests?.split(',').map(s => s.trim()).filter(Boolean) ?? []),
      ...(r.crad2_personalinterests?.split(',').map(s => s.trim()).filter(Boolean) ?? []),
    ],
    smalltalkTopics: r.crad2_smalltalk?.split(',').map(s => s.trim()).filter(Boolean) ?? [],
    avatarInitials: (r.crad2_name ?? '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
    avatarColor: hashColor(r.crad2_ebmcontactid),
  }));
}

// ─── Action Items ─────────────────────────────────────────────────────────────

export async function loadActionItemsFromDataverse(): Promise<ActionItem[]> {
  const result = await Crad2_ebmactionitemsService.getAll({
    select: [
      'crad2_ebmactionitemid', 'crad2_name', 'crad2_priority',
      'crad2_duedate', 'crad2_iscompleted', '_crad2_meeting_value', 'crad2_assignedto',
    ],
    filter: 'statecode eq 0',
    orderBy: ['crad2_duedate asc'],
  });
  if (!result.success || !result.data) return [];

  return result.data.map(r => ({
    id: r.crad2_ebmactionitemid,
    title: r.crad2_name ?? 'Untitled',
    priority: mapPriority(r.crad2_priority),
    dueDate: r.crad2_duedate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    completed: (r.crad2_iscompleted as unknown as number) === 1,
    meetingId: r._crad2_meeting_value ?? '',
    assigneeId: r.crad2_assignedto,
  }));
}

export async function createActionItemInDataverse(item: {
  title: string;
  priority: Priority;
  dueDate: string;
  meetingId?: string;
}): Promise<string | null> {
  const priorityMap: Record<Priority, number> = {
    high: 100000000, medium: 100000001, low: 100000002,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const record: any = {
    crad2_name: item.title,
    crad2_priority: priorityMap[item.priority],
    crad2_duedate: item.dueDate,
    crad2_iscompleted: false,
  };
  if (item.meetingId) {
    record['crad2_meeting@odata.bind'] = `/crad2_ebmmeetings(${item.meetingId})`;
  }
  try {
    const result = await Crad2_ebmactionitemsService.create(record);
    console.log('[createActionItem] result:', JSON.stringify(result));
    // Dataverse may return 204 (no body) — success with no data is still a success
    if (result.success) {
      return result.data?.crad2_ebmactionitemid ?? null;
    }
    console.error('[createActionItem] failed:', result);
    return null;
  } catch (err) {
    console.error('[createActionItem] error:', err);
    return null;
  }
}

export async function toggleActionItemInDataverse(id: string, completed: boolean): Promise<void> {
  await Crad2_ebmactionitemsService.update(id, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crad2_iscompleted: (completed ? 1 : 0) as any,
  });
}

// ─── Highlights ───────────────────────────────────────────────────────────────

export async function loadHighlightsFromDataverse(): Promise<Highlight[]> {
  const result = await Crad2_ebmweeklyhighlightsService.getAll({
    select: [
      'crad2_ebmweeklyhighlightid', 'crad2_title', 'crad2_description',
      'crad2_priority', '_crad2_meeting_value',
    ],
    filter: 'statecode eq 0',
    orderBy: ['crad2_priority desc'],
  });
  if (!result.success || !result.data) return [];

  return result.data.map(r => ({
    id: r.crad2_ebmweeklyhighlightid,
    title: r.crad2_title ?? 'Untitled',
    description: r.crad2_description ?? '',
    type: 'insight' as const,
    meetingId: r._crad2_meeting_value,
    priority: (r.crad2_priority as unknown as number) === 100000002 ? 3
      : (r.crad2_priority as unknown as number) === 100000001 ? 2 : 1,
  }));
}

// ─── Per-meeting data (loaded on-demand in overlay) ───────────────────────────

export interface MailArtifact {
  id: string;
  subject: string;
  preview: string;
  draft: string;
  meetingId: string;
  contactId?: string;
}

export async function loadMailArtifactsForMeeting(meetingId: string): Promise<MailArtifact[]> {
  const result = await Crad2_ebmmailartifactsService.getAll({
    select: ['crad2_ebmmailartifactid', 'crad2_subject', 'crad2_preview', 'crad2_draft', '_crad2_contact_value'],
    filter: `_crad2_meeting_value eq '${meetingId}'`,
  });
  if (!result.success || !result.data) return [];
  return result.data.map(r => ({
    id: r.crad2_ebmmailartifactid,
    subject: r.crad2_subject ?? '',
    preview: r.crad2_preview ?? '',
    draft: r.crad2_draft ?? '',
    meetingId,
    contactId: r._crad2_contact_value,
  }));
}

export interface SocialInsight {
  id: string;
  text: string;
  priority: Priority;
  contactId?: string;
  meetingId: string;
}

export async function loadSocialInsightsForMeeting(meetingId: string): Promise<SocialInsight[]> {
  const result = await Crad2_ebmsocialinsightsService.getAll({
    select: ['crad2_ebmsocialinsightid', 'crad2_name', 'crad2_insighttext', 'crad2_priority', '_crad2_contact_value'],
    filter: `_crad2_meeting_value eq '${meetingId}'`,
  });
  if (!result.success || !result.data) return [];
  return result.data.map(r => ({
    id: r.crad2_ebmsocialinsightid,
    text: r.crad2_insighttext ?? r.crad2_name ?? '',
    priority: mapPriority(r.crad2_priority),
    contactId: r._crad2_contact_value,
    meetingId,
  }));
}

export interface AudioBriefing {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  transcript: string;
  meetingId: string;
}

export async function loadAudioBriefingsForMeeting(meetingId: string): Promise<AudioBriefing[]> {
  const result = await Crad2_ebmaudiobriefingsService.getAll({
    select: ['crad2_ebmaudiobriefingid', 'crad2_title', 'crad2_duration', 'crad2_audiourl', 'crad2_transcript'],
    filter: `_crad2_meeting_value eq '${meetingId}'`,
  });
  if (!result.success || !result.data) return [];
  return result.data.map(r => ({
    id: r.crad2_ebmaudiobriefingid,
    title: r.crad2_title ?? '',
    duration: (r.crad2_duration as unknown as number) ?? 0,
    audioUrl: r.crad2_audiourl ?? '',
    transcript: r.crad2_transcript ?? '',
    meetingId,
  }));
}

export interface DvParticipant {
  id: string;
  name: string;
  contactId?: string;
  internalEmail?: string;
  isInternal: boolean;
  role: string;
}

export async function loadParticipantsForMeeting(meetingId: string): Promise<DvParticipant[]> {
  const result = await Crad2_ebmmeetingparticipantsService.getAll({
    select: [
      'crad2_ebmmeetingparticipantid', 'crad2_name', 'crad2_isinternal',
      'crad2_internaluseremail', 'crad2_role', '_crad2_contact_value',
    ],
    filter: `_crad2_meeting_value eq '${meetingId}'`,
  });
  if (!result.success || !result.data) return [];
  return result.data.map(r => ({
    id: r.crad2_ebmmeetingparticipantid,
    name: r.crad2_name ?? '',
    contactId: r._crad2_contact_value,
    internalEmail: r.crad2_internaluseremail,
    isInternal: (r.crad2_isinternal as unknown as number) === 1,
    role: r.crad2_role ?? '',
  }));
}
