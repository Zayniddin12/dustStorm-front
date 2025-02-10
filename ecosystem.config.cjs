module.exports = {
  apps: [
    {
      name: 'Nuxt 3 Preview',
      port: 3000,
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      args: 'preview',
    },
  ],
}
