#!/bin/bash

# Setup Supabase Database for MedEd Swarm
# Run this once before launching the swarm

echo "🗄️  Setting up Supabase database..."
echo ""

# Load environment variables
source .env.local

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "❌ NEXT_PUBLIC_SUPABASE_URL not set in .env.local"
    exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ SUPABASE_SERVICE_ROLE_KEY not set in .env.local"
    echo "   Get it from: supabase.com → Project Settings → API → service_role key"
    exit 1
fi

echo "✅ Environment variables loaded"
echo ""

# Extract project ref from URL
PROJECT_REF=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed 's/https:\/\///' | sed 's/.supabase.co//')

echo "📊 Project: $PROJECT_REF"
echo ""

# Run schema using curl
echo "🔄 Running database schema..."
echo "   This will create all tables, indexes, and functions..."
echo ""

SCHEMA_SQL=$(cat supabase/schema.sql)

# Use Supabase REST API to execute SQL
RESPONSE=$(curl -s -X POST \
  "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$SCHEMA_SQL" | jq -Rs .)}")

echo "Response: $RESPONSE"
echo ""

echo "✅ Schema setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Verify tables created at: $NEXT_PUBLIC_SUPABASE_URL"
echo "   2. Run: npm run build"
echo "   3. Run: npm run start"
echo "   4. Launch swarm: npm run swarm:prod"
echo ""
