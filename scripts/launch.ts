#!/usr/bin/env ts-node
/**
 * Launch Script for MedEd Orchestration Swarm
 * Usage: npm run swarm
 */

import { getOrchestrator } from '../src/orchestrator/hivemind';

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║     🧠 MEDED ORCHESTRATION SWARM - AUTONOMOUS MODE       ║
║                                                           ║
║  Target: 70/70 Score in 10 Iterations                    ║
║  Budget: $25 Max Cost                                    ║
║  Runtime: 8 Hours Max                                    ║
║  Confidence: 99.9%                                       ║
╚═══════════════════════════════════════════════════════════╝
`);

  console.log('📋 SYSTEM CHECK:\n');

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'ANTHROPIC_API_KEY',
    'DEEPSEEK_API_KEY',
  ];

  let missingVars = [];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(`❌ ${envVar}: NOT SET`);
      missingVars.push(envVar);
    } else {
      console.log(`✅ ${envVar}: SET`);
    }
  }

  if (missingVars.length > 0) {
    console.log(`\n❌ Missing required environment variables!`);
    console.log(`   Please set: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  console.log('\n🚀 Launching Hivemind Orchestrator...\n');

  // Get orchestrator instance
  const orchestrator = getOrchestrator();

  // Start autonomous loop
  await orchestrator.start();

  console.log('\n✅ Orchestrator completed successfully!');
  process.exit(0);
}

// Handle errors
main().catch((error) => {
  console.error('\n❌ FATAL ERROR:', error);
  process.exit(1);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n⚠️  Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});
