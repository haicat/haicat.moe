module.exports = {
    domain: ["haicat.moe", "fur.art"], //root level domains only
    http:{
        port: 80
    },
    https:{
        port: 443,
        sec:{
            key: '/etc/letsencrypt/live/haicat.moe/privkey.pem',
            cert: '/etc/letsencrypt/live/haicat.moe/fullchain.pem'
        }
    }
};