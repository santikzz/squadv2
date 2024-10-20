const Group = require('../models/group');

// @desc    Get all groups
// @route   GET /api/groups
// @access  Private
const getAll = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Get group by ID
// @route   GET /api/groups/:id
// @access  Private
const getById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Create group
// @route   POST /api/groups
// @access  Private
const createGroup = async (req, res) => {
    try {
        const { title, description, privacy, max_members } = req.body;
        const group = new Group({
            owner: req.userId,
            title,
            description,
            privacy: privacy || 'public',
            max_members: max_members || null,
            members: [req.userId]
        });
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Update group
// @route   PUT /api/groups/:id
// @access  Private
const updateGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const { title, description, privacy, max_members } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (group.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this group' });
        }
        group.title = title || group.title;
        group.description = description || group.description;
        group.privacy = privacy || group.privacy;
        group.max_members = max_members !== undefined ? max_members : group.max_members;
        await group.save();
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Delete group
// @route   DELETE /api/groups/:id
// @access  Private
const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (group.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this group' });
        }
        await group.deleteOne();
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// @desc    Group join request
// @route   POST /api/groups/:id/join
// @access  Private
const joinGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.userId;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (group.owner.toString() === userId) {
            return res.status(400).json({ message: 'The owner cannot join their own group' });
        }
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'You are already a member of this group' });
        }
        if (group.max_members && group.members.length >= group.max_members) {
            return res.status(400).json({ message: 'Group is full' });
        }
        if (group.privacy === 'public') {
            group.members.push(userId);
            await group.save();
            return res.status(200).json({ message: 'Join request sent' });
        }

        if (group.privacy === 'private') {

            const existingRequest = group.join_requests.find(
                (request) => request.userId.toString() === userId
            );

            if (existingRequest) {
                return res.status(400).json({ message: 'Join request already sent' });
            }

            group.join_requests.push({ userId, requestedAt: new Date() });
            await group.save();
            return res.status(200).json({ message: 'Join request sent to the group owner for approval' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error joining group', error: err.message });
    }
}

// @desc    Owner manage group join request
// @route   POST /api/groups/:id/join-request
// @access  Private
const manageJoinRequest = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.body.userId;
        const action = req.body.action;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to manage join requests' });
        }

        const joinRequest = group.join_requests.find(request => request.userId.toString() === userId);
        if (!joinRequest) {
            return res.status(400).json({ message: 'No join request from this user' });
        }

        if (action === 'accept') {
            if (group.max_members && group.members.length >= group.max_members) {
                return res.status(400).json({ message: 'Group is full' });
            }
            group.members.push(userId);
            group.join_requests = group.join_requests.filter((request) => request.userId.toString() !== userId);
            await group.save();
            return res.status(200).json({ message: 'User added to the group' });

        } else if (action === 'decline') {
            group.join_requests = group.join_requests.filter((request) => request.userId.toString() !== userId);
            await group.save();
            return res.json({ message: 'Join request declined' });

        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error managing join request', error: err.message });
    }
}

// @desc    Leave group
// @route   POST /api/groups/:id/leave
// @access  Private
const leaveGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.userId;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() === userId) {
            return res.status(400).json({ message: 'The owner cannot leave their own group' });
        }

        const memberIndex = group.members.indexOf(userId);
        if (memberIndex === -1) {
            return res.status(400).json({ message: 'You are not a member of this group' });
        }

        group.members.splice(memberIndex, 1); // remove the user from the members list
        await group.save();
        res.status(200).json({ message: 'You have left the group' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error leaving group', error: err.message });
    }
}

// @desc    Kick member group
// @route   POST /api/groups/:id/kick
// @access  Private
const kickMember = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.userId;
        const userIdtoKick = req.body.userId;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to kick members from this group' });
        }

        const memberIndex = group.members.indexOf(userIdToKick);
        if (memberIndex === -1) {
            return res.status(400).json({ message: 'The specified user is not a member of this group' });
        }

        if (group.owner.toString() === userIdToKick) {
            return res.status(400).json({ message: 'You cannot kick yourself as the owner' });
        }

        group.members.splice(memberIndex, 1);
        await group.save();
        res.json({ message: 'Member has been kicked from the group' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error kicking member from group', error: err.message });
    }
}

module.exports = { getAll, getById, createGroup, updateGroup, deleteGroup, joinGroup, manageJoinRequest, leaveGroup, kickMember }