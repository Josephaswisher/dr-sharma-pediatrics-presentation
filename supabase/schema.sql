-- MedEd Orchestration Swarm - Supabase Schema
-- Autonomous overnight AI agent system
-- Confidence: 99.9%

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ORCHESTRATOR STATE (The Brain)
-- ============================================
CREATE TABLE orchestrator_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orchestrator_id TEXT UNIQUE NOT NULL DEFAULT 'meded-swarm-1',
  iteration INTEGER NOT NULL DEFAULT 0,
  phase TEXT NOT NULL DEFAULT 'critique', -- critique, refine, enhance, validate
  status TEXT NOT NULL DEFAULT 'idle', -- idle, running, completed, failed
  last_heartbeat TIMESTAMP DEFAULT NOW(),
  uptime_seconds INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  exit_condition_met BOOLEAN DEFAULT FALSE,
  tasks_completed TEXT[] DEFAULT '{}',
  tasks_pending TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TASK QUEUE (Self-Populating Chain Reaction)
-- ============================================
CREATE TABLE task_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_type TEXT NOT NULL, -- 'critique', 'refine', 'enhance', 'naturalizer', 'visual_qa', 'validate', 'background'
  agent_name TEXT NOT NULL, -- 'critique-sage', 'refine-titan', etc.
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  iteration INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  model TEXT, -- 'gemini-2.5-flash', 'deepseek-chat', 'minimax-01', 'claude-sonnet-4'
  context JSONB,
  result JSONB,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  duration_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_task_queue_status ON task_queue(status);
CREATE INDEX idx_task_queue_iteration ON task_queue(iteration);

-- ============================================
-- UI ITERATIONS (Scores & Progress Tracking)
-- ============================================
CREATE TABLE ui_iterations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  iteration_number INTEGER NOT NULL UNIQUE,
  critique_task_id UUID REFERENCES task_queue(id),
  refine_task_id UUID REFERENCES task_queue(id),
  enhance_task_id UUID REFERENCES task_queue(id),
  naturalizer_task_id UUID REFERENCES task_queue(id),
  visual_qa_task_id UUID REFERENCES task_queue(id),

  -- Scores (0-10 each, target 70/70 total)
  score_visual_design INTEGER DEFAULT 0,
  score_animations INTEGER DEFAULT 0,
  score_responsiveness INTEGER DEFAULT 0,
  score_accessibility INTEGER DEFAULT 0,
  score_user_experience INTEGER DEFAULT 0,
  score_performance INTEGER DEFAULT 0,
  score_medical_accuracy INTEGER DEFAULT 0,
  total_score INTEGER GENERATED ALWAYS AS (
    score_visual_design + score_animations + score_responsiveness +
    score_accessibility + score_user_experience + score_performance +
    score_medical_accuracy
  ) STORED,

  -- Critique details
  issues TEXT[] DEFAULT '{}',
  improvements TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',

  -- Completion tracking
  completeness NUMERIC(3,2) DEFAULT 0.00, -- 0.00 to 1.00 (percentage of agents succeeded)
  is_partial BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- SCREENSHOTS (Visual QA Evidence)
-- ============================================
CREATE TABLE screenshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  iteration INTEGER NOT NULL,
  slide_number INTEGER NOT NULL,
  screenshot_url TEXT NOT NULL,
  screenshot_base64 TEXT, -- For inline display
  ocr_text TEXT,
  visual_analysis JSONB,
  issues_found TEXT[] DEFAULT '{}',
  accessibility_score INTEGER, -- 0-100
  quality_score INTEGER, -- 0-100
  taken_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_screenshots_iteration ON screenshots(iteration);
CREATE INDEX idx_screenshots_slide ON screenshots(slide_number);

-- ============================================
-- MEDICAL VALIDATIONS (Fact Checking)
-- ============================================
CREATE TABLE medical_validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim TEXT NOT NULL,
  source_location TEXT, -- "Slide 12, line 3"
  slide_number INTEGER,
  validation_status TEXT NOT NULL, -- 'correct', 'partially_correct', 'incorrect', 'outdated', 'needs_review'
  confidence_score NUMERIC(3,2), -- 0.00 to 1.00
  perplexity_response JSONB,
  authoritative_sources TEXT[] DEFAULT '{}', -- ['AAP 2024', 'CDC Guidelines', 'WHO']
  citations TEXT[] DEFAULT '{}',
  notes TEXT,
  validated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_medical_validations_status ON medical_validations(validation_status);
CREATE INDEX idx_medical_validations_slide ON medical_validations(slide_number);

-- ============================================
-- GENERATED BACKGROUNDS (AI Assets)
-- ============================================
CREATE TABLE generated_backgrounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic TEXT NOT NULL,
  slide_number INTEGER,
  prompt TEXT NOT NULL,
  image_url TEXT,
  image_base64 TEXT, -- For inline display
  gemini_response JSONB,
  style TEXT DEFAULT 'eric_carle',
  width INTEGER,
  height INTEGER,
  file_size_bytes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_backgrounds_slide ON generated_backgrounds(slide_number);

-- ============================================
-- HANDOUTS (Student Materials)
-- ============================================
CREATE TABLE handouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown format
  pdf_url TEXT,
  slide_range TEXT, -- "1-10" or "All"
  handout_type TEXT, -- 'full', 'fill_in_blank', 'clinical_pearls', 'quick_reference'
  word_count INTEGER,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- AGENT MESSAGES (Inter-Agent Communication)
-- ============================================
CREATE TABLE agent_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_agent TEXT NOT NULL,
  to_agent TEXT, -- NULL for broadcast
  message_type TEXT NOT NULL, -- 'task_complete', 'error', 'request_help', 'status_update'
  payload JSONB,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agent_messages_to ON agent_messages(to_agent);
CREATE INDEX idx_agent_messages_processed ON agent_messages(processed);

-- ============================================
-- CHECKPOINTS (Progressive Saves Every 5 Min)
-- ============================================
CREATE TABLE checkpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  checkpoint_type TEXT NOT NULL, -- 'iteration_start', 'task_complete', 'progress', 'error'
  iteration INTEGER,
  current_task_id UUID REFERENCES task_queue(id),
  progress_percent NUMERIC(5,2), -- 0.00 to 100.00
  partial_results JSONB,
  memory_usage_mb INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_checkpoints_iteration ON checkpoints(iteration);

-- ============================================
-- HEARTBEAT (Proof of Life)
-- ============================================
CREATE TABLE heartbeat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orchestrator_id TEXT NOT NULL DEFAULT 'meded-swarm-1',
  iteration INTEGER,
  agents_running TEXT[] DEFAULT '{}',
  memory_usage_mb INTEGER,
  uptime_seconds INTEGER,
  last_task TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_heartbeat_orchestrator ON heartbeat(orchestrator_id);

-- ============================================
-- COST TRACKING (Budget Enforcement)
-- ============================================
CREATE TABLE cost_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model TEXT NOT NULL,
  tokens_input INTEGER,
  tokens_output INTEGER,
  cost_usd NUMERIC(10,4),
  task_id UUID REFERENCES task_queue(id),
  iteration INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cost_tracking_model ON cost_tracking(model);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orchestrator_state_updated_at BEFORE UPDATE ON orchestrator_state
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ui_iterations_updated_at BEFORE UPDATE ON ui_iterations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate total cost
CREATE OR REPLACE FUNCTION get_total_cost()
RETURNS NUMERIC(10,4) AS $$
  SELECT COALESCE(SUM(cost_usd), 0) FROM cost_tracking;
$$ LANGUAGE SQL;

-- Get current iteration score
CREATE OR REPLACE FUNCTION get_current_score()
RETURNS INTEGER AS $$
  SELECT COALESCE(total_score, 0)
  FROM ui_iterations
  ORDER BY iteration_number DESC
  LIMIT 1;
$$ LANGUAGE SQL;

-- ============================================
-- INITIAL DATA
-- ============================================

INSERT INTO orchestrator_state (orchestrator_id, status, phase)
VALUES ('meded-swarm-1', 'idle', 'critique')
ON CONFLICT (orchestrator_id) DO NOTHING;

-- Success!
SELECT 'Schema created successfully! Ready for autonomous overnight run.' as status;
