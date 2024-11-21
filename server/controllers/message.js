const Message = require('../models/message');
const Group = require('../models/group');
const UserGroup = require('../models/user-group');

const isMemberOf = async (groupId, userId) => {
    const group = await Group.findById(groupId).select('owner members');
    if (!group) {
        return false;
    }
    const isMember = (group.owner.equals(userId)) || (group.members.includes(userId));
    if (!isMember) {
        if (!group) {
            return false;
        }
    }
    return true;
}


// @desc    Get all messages from a group
// @route   GET /messages/group/:id
// @access  Private
const getMessagesByGroupId = async (req, res) => {
    try {

        const userId = req.userId;
        const groupId = req.params.id;

        // const group = await Group.findById(groupId).select('owner members');
        // if (!group) {
        //     return res.status(404).json({ message: 'Group not found' });
        // }

        // const isMember = (group.owner.equals(req.userId)) || (group.members.includes(userId));
        // if (!isMember) {
        //     if (!group) {
        //         return res.status(403).json({ message: 'You are not a member of this group' });
        //     }
        // }

        const isMember = await isMemberOf(groupId, userId);
        if (!isMember) {
            return res.status(403).json({ message: 'You are not a member of this group' });
        }

        const messages = await Message.find({ groupId: groupId })
            .populate('userId', 'name surname image_url');
        res.status(200).json(messages);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const saveMessage = async (data) => {
    try {
        const { groupId, userId, content } = data;

        const isMember = await isMemberOf(groupId, userId);
        if (!isMember) {
            return null;
        }

        const message = new Message({
            groupId: groupId,
            userId: userId,
            content: content,
        });
        await message.save();

        const _message = await Message.findById(message._id)
            .populate('userId', 'name surname image_url');

        return _message;

    } catch (err) {
        return null;
    }
}

const updateLastRead = async (groupId, userId) => {
    try {
        
        const userGroup = await UserGroup.findOneAndUpdate({ userId, groupId },
            { lastRead: new Date() },
            { upsert: true, new: true }
        );

        return true;
    } catch (err) {
        return null;
    }
}

const getUnreadCount = async (groupId, userId) => {
    try {

        const userGroup = await UserGroup.findOne({ userId, groupId });
        const lastRead = userGroup ? userGroup.lastRead : null;

        const unreadCount = await Message.countDocuments({
            groupId,
            createdAt: { $gt: lastRead || new Date(0) }
        });

        return unreadCount;

    } catch (err) {
        return 0;
    }
};

module.exports = { getMessagesByGroupId, saveMessage, updateLastRead, getUnreadCount }