'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only initialize if credentials exist
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export function useSupabase() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate session ID
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substr(2, 9);
    const id = 'session-' + timestamp + '-' + random;
    setSessionId(id);

    // Track session start
    if (supabase) {
      supabase
        .from('sessions')
        .insert({
          session_id: id,
          started_at: new Date().toISOString(),
        })
        .then();
    }
  }, []);

  const trackSlideView = async (slideId: number) => {
    if (!supabase || !sessionId) return;

    try {
      await supabase.from('slide_views').insert({
        session_id: sessionId,
        slide_id: slideId,
        viewed_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error tracking slide view:', error);
    }
  };

  const trackQuizResponse = async (slideId: number, correct: boolean) => {
    if (!supabase || !sessionId) return;

    try {
      await supabase.from('quiz_responses').insert({
        session_id: sessionId,
        slide_id: slideId,
        correct,
        answered_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error tracking quiz response:', error);
    }
  };

  return {
    trackSlideView,
    trackQuizResponse,
  };
}
