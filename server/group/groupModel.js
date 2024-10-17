const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',                        // reference to user model
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,                        // remove extra spaces
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    privacy: {
        type: String,
        enum: ['public', 'private'],
        required: true,
        default: 'public',
    },
    max_members: {
        type: Number,
        default: null,
        max: 100,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    join_requests: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        requestedAt: {
            type: Date,
            default: Date.now,
        },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Group', GroupSchema);