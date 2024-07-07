const PROXY_HOST =   "http://mailapi.skytechsolutionsbd.com";
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target:PROXY_HOST,
        secure:false
    },
];

module.exports =  PROXY_CONFIG;