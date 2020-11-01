require('dotenv').config()
module.exports = {
    google: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    },
    facebook: {
        CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
        SECRET_ID: process.env.FACEBOOK_SECRET_ID
    },
    twitter: {
        CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET
    },
    session: {
        cookieKey: process.env.SESSION_COOKIE_KEY,
        cookieSecret: process.env.SESSION_COOKIE_SECRET
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}
