/**
 * API Route: /api/tasks
 * Manage task queue
 */

import { NextRequest, NextResponse } from 'next/server';
import { addTask, getNextTask, updateTask, supabase } from '@/lib/supabase';

// GET /api/tasks - Get all tasks or next pending task
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'next') {
      const task = await getNextTask();
      return NextResponse.json(task);
    }

    // Get all tasks
    const { data, error } = await supabase
      .from('task_queue')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting tasks:', error);
    return NextResponse.json(
      { error: 'Failed to get tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Add new task to queue
export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json();
    const task = await addTask(taskData);
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json(
      { error: 'Failed to add task' },
      { status: 500 }
    );
  }
}

// PATCH /api/tasks/:id - Update task status
export async function PATCH(request: NextRequest) {
  try {
    const { taskId, ...updates } = await request.json();
    const task = await updateTask(taskId, updates);
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}
