module.exports = {
    apps: [
        {
            name: 'mygithub',
            script: './src/main.tsx',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            en: {
                NODE_ENV: 'production'
            }
        }
    ]
}