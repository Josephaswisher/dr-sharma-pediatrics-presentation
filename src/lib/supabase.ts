/**
 * Supabase Client Configuration
 * - Connection pooling
 * - Retry logic
 * - Error handling
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Custom fetch with retry logic
async function fetchWithRetryLogic(
  input: RequestInfo | URL,
  init?: RequestInit,
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(input, init);
      if (response.ok || response.status < 500) {
        return response;
      }
      // Server error, retry
      if (i < retries - 1) {
        const backoff = Math.pow(2, i) * 1000;
        console.log(`⏳ Supabase request failed, retrying in ${backoff}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      const backoff = Math.pow(2, i) * 1000;
      console.log(`⏳ Supabase connection error, retrying in ${backoff}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
  throw new Error('Max retries exceeded');
}

// Wrapper function that matches fetch signature exactly
const fetchWithRetry = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  return fetchWithRetryLogic(input, init, 3);
};

// Create singleton Supabase client with connection pooling
let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false, // Backend doesn't need sessions
      },
      global: {
        fetch: fetchWithRetry,
        headers: {
          'x-application': 'meded-swarm',
        },
      },
      db: {
        schema: 'public',
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  }
  return supabaseInstance;
}

// Helper functions for common operations
export const supabase = getSupabase();

/**
 * Get current orchestrator state
 */
export async function getOrchestratorState() {
  const { data, error } = await supabase
    .from('orchestrator_state')
    .select('*')
    .eq('orchestrator_id', 'meded-swarm-1')
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update orchestrator state
 */
export async function updateOrchestratorState(updates: any) {
  const { data, error } = await supabase
    .from('orchestrator_state')
    .update(updates)
    .eq('orchestrator_id', 'meded-swarm-1')
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Add task to queue
 */
export async function addTask(task: {
  task_type: string;
  agent_name: string;
  iteration: number;
  prompt: string;
  model?: string;
  context?: any;
}) {
  const { data, error } = await supabase
    .from('task_queue')
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get next pending task
 */
export async function getNextTask() {
  const { data, error } = await supabase
    .from('task_queue')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data || null;
}

/**
 * Update task status
 */
export async function updateTask(
  taskId: string,
  updates: {
    status?: string;
    result?: any;
    error?: string;
    started_at?: string;
    completed_at?: string;
    duration_ms?: number;
  }
) {
  const { data, error } = await supabase
    .from('task_queue')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Save checkpoint
 */
export async function saveCheckpoint(checkpoint: {
  checkpoint_type: string;
  iteration?: number;
  current_task_id?: string;
  progress_percent?: number;
  partial_results?: any;
  memory_usage_mb?: number;
}) {
  const { data, error } = await supabase
    .from('checkpoints')
    .insert(checkpoint)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get last checkpoint
 */
export async function getLastCheckpoint() {
  const { data, error} = await supabase
    .from('checkpoints')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

/**
 * Send heartbeat
 */
export async function sendHeartbeat(heartbeat: {
  iteration?: number;
  agents_running?: string[];
  memory_usage_mb?: number;
  uptime_seconds?: number;
  last_task?: string;
}) {
  const { data, error } = await supabase
    .from('heartbeat')
    .insert(heartbeat)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Track API cost
 */
export async function trackCost(cost: {
  model: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  task_id?: string;
  iteration?: number;
}) {
  const { data, error } = await supabase
    .from('cost_tracking')
    .insert(cost)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get total cost
 */
export async function getTotalCost(): Promise<number> {
  const { data, error } = await supabase.rpc('get_total_cost');
  if (error) throw error;
  return data || 0;
}

/**
 * Get current iteration score
 */
export async function getCurrentScore(): Promise<number> {
  const { data, error } = await supabase.rpc('get_current_score');
  if (error) throw error;
  return data || 0;
}

/**
 * Save screenshot
 */
export async function saveScreenshot(screenshot: {
  iteration: number;
  slide_number: number;
  screenshot_url: string;
  screenshot_base64?: string;
  ocr_text?: string;
  visual_analysis?: any;
  issues_found?: string[];
  accessibility_score?: number;
  quality_score?: number;
}) {
  const { data, error } = await supabase
    .from('screenshots')
    .insert(screenshot)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Save medical validation
 */
export async function saveMedicalValidation(validation: {
  claim: string;
  source_location?: string;
  slide_number?: number;
  validation_status: string;
  confidence_score?: number;
  perplexity_response?: any;
  authoritative_sources?: string[];
  citations?: string[];
  notes?: string;
}) {
  const { data, error } = await supabase
    .from('medical_validations')
    .insert(validation)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Save iteration results
 */
export async function saveIterationResults(iteration: {
  iteration_number: number;
  critique_task_id?: string;
  refine_task_id?: string;
  enhance_task_id?: string;
  naturalizer_task_id?: string;
  visual_qa_task_id?: string;
  score_visual_design?: number;
  score_animations?: number;
  score_responsiveness?: number;
  score_accessibility?: number;
  score_user_experience?: number;
  score_performance?: number;
  score_medical_accuracy?: number;
  issues?: string[];
  improvements?: string[];
  recommendations?: string[];
  completeness?: number;
  is_partial?: boolean;
}) {
  const { data, error } = await supabase
    .from('ui_iterations')
    .insert(iteration)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export default supabase;
