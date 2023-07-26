module.exports = {
    http:{
        port: 3000
    },
    https:{
        port: 3010,
        sec:{
            key: '/etc/letsencrypt/live/haicat.moe/privkey.pem',
            cert: '/etc/letsencrypt/live/haicat.moe/fullchain.pem'
        }
    }
};