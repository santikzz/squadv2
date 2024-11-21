const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGroupSchema = new mongoose.Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lastRead: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('UserGroup', UserGroupSchema);