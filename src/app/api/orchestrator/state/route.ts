/**
 * API Route: /api/orchestrator/state
 * Get and update orchestrator state
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrchestratorState, updateOrchestratorState } from '@/lib/supabase';

export async function GET() {
  try {
    const state = await getOrchestratorState();
    return NextResponse.json(state);
  } catch (error) {
    console.error('Error getting orchestrator state:', error);
    return NextResponse.json(
      { error: 'Failed to get orchestrator state' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const updates = await request.json();
    const state = await updateOrchestratorState(updates);
    return NextResponse.json(state);
  } catch (error) {
    console.error('Error updating orchestrator state:', error);
    return NextResponse.json(
      { error: 'Failed to update orchestrator state' },
      { status: 500 }
    );
  }
}
