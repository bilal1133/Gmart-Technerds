module.exports = {
    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': 3306,
        'MYSQL_DATABASE': 'gmarket',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': '',
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.node = {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
        return config
    },
    webpackDevMiddleware: config => {
        return config
    },
    async rewrites() {
        return [
            {
                source: '/:any*',
                destination: '/',
            },
        ]
    }
}