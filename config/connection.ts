export default {
    domain: ["haicat.moe", "fur.art"], //root level domains only
    secure: true,
    domainSpoof: null,
    http:{
        port: 8080
    },
    https:{
        port: 443,
        sec:{
            key: '/etc/letsencrypt/live/haicat.moe/privkey.pem',
            cert: '/etc/letsencrypt/live/haicat.moe/fullchain.pem'
        }
    }
};