require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        mongoUri: process.env.MONGO_URI
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
};

module.exports = config;