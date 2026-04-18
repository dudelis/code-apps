import { acquireToken } from './authService';

export interface FlowInput {
  input1: string;
  input2: string;
}

export interface FlowOutput {
  output: string;
}

const FLOW_URL =
  'https://7edee57a8151e2919c30d0418c88af.4d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/f1207ae73dc54c1182617fefb126da3a/triggers/manual/paths/invoke?api-version=1';

export async function runTestFlow(input: FlowInput): Promise<FlowOutput> {
  const token = await acquireToken();

  const response = await fetch(FLOW_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`Flow failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<FlowOutput>;
}

export interface AiFlowInput {
  userPrompt: string;
  systemPrompt: string;
}

export interface AiFlowOutput {
  message: string;
}

const AI_FLOW_URL =
  'https://7edee57a8151e2919c30d0418c88af.4d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/e58759719d674c0785c0744980457829/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xZB28kwZCQ4Mp4wWqcovcvg7ZUpLOEZGALxZIGY4P64';

export async function runAiFlow(input: AiFlowInput): Promise<AiFlowOutput> {
  const response = await fetch(AI_FLOW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`AI flow failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<AiFlowOutput>;
}
