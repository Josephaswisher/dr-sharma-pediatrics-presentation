module.exports = {
  apps: [{
    name: 'meded-swarm',
    script: './scripts/launch.ts',
    interpreter: 'ts-node',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    restart_delay: 1000,
    max_restarts: 999,
    min_uptime: '10s',
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'production',
    },
  }],
};
