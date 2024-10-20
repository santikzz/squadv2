const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [64, 'title must not exceed 64 characters'],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [512, 'description must not exceed 512 characters'],
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
        max: 50,
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