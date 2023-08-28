module.exports = {
  apps: [{
    name: 'backend',
    script: './app.js',
    instances: '2',
    exec_mode: 'cluster',
    wait_ready: true,
    listen_timeout: 15000,
    kill_timeout: 45000
  }]
}
