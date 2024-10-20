const mongoose = require('mongoose');
const config = require('./index');

const connect = async () => {
    try {
        await mongoose.connect(config.db.mongoUri);
        console.log('[*] Connected to database successfully.');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = { connect };