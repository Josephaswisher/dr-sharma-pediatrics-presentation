/**
 * API Route: /api/dashboard
 * Real-time dashboard data
 */

import { NextResponse } from 'next/server';
import { supabase, getOrchestratorState, getTotalCost, getCurrentScore } from '@/lib/supabase';

export async function GET() {
  try {
    // Get orchestrator state
    const orchestratorState = await getOrchestratorState();

    // Get recent heartbeats
    const { data: heartbeats } = await supabase
      .from('heartbeat')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // Get current iteration
    const { data: currentIteration } = await supabase
      .from('ui_iterations')
      .select('*')
      .order('iteration_number', { ascending: false })
      .limit(1)
      .single();

    // Get active tasks
    const { data: activeTasks } = await supabase
      .from('task_queue')
      .select('*')
      .eq('status', 'running');

    // Get pending tasks count
    const { count: pendingCount } = await supabase
      .from('task_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get completed tasks count
    const { count: completedCount } = await supabase
      .from('task_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Get total cost
    const totalCost = await getTotalCost();

    // Get current score
    const currentScore = await getCurrentScore();

    // Get recent screenshots
    const { data: recentScreenshots } = await supabase
      .from('screenshots')
      .select('*')
      .order('taken_at', { ascending: false })
      .limit(5);

    // Get medical validations summary
    const { data: validations } = await supabase
      .from('medical_validations')
      .select('validation_status');

    const validationSummary = validations?.reduce((acc: any, v: any) => {
      acc[v.validation_status] = (acc[v.validation_status] || 0) + 1;
      return acc;
    }, {});

    // Build dashboard response
    return NextResponse.json({
      orchestrator: orchestratorState,
      current_iteration: currentIteration,
      active_tasks: activeTasks || [],
      pending_count: pendingCount || 0,
      completed_count: completedCount || 0,
      total_cost: totalCost,
      current_score: currentScore,
      target_score: 70,
      progress_percent: ((currentScore / 70) * 100).toFixed(1),
      recent_heartbeats: heartbeats || [],
      recent_screenshots: recentScreenshots || [],
      validation_summary: validationSummary || {},
      is_running: orchestratorState.status === 'running',
      iteration_progress: `${orchestratorState.iteration}/10`,
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to get dashboard data' },
      { status: 500 }
    );
  }
}
