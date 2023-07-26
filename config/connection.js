module.exports = {
    http:{
        port: 3000
    },
    https:{
        port: 3010,
        sec:{
            key: '/home/haicat/certs/privkey.pem',
            cert: '/home/haicat/certs/fullchain.pem'
        }
    }
};