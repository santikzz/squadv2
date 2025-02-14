require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    socketPort: process.env.SOCKET_PORT || 3001,
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
    clientURL: process.env.CLIENT_URL,
};

module.exports = config;