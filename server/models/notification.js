const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['join_request', 'new_member'],
        required: true,
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'read'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
