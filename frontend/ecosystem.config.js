// PM2 process manager config for running the Next.js production server.
// Usage: npm run build && pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "harry-zanzibar-frontend",
      cwd: __dirname,
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
