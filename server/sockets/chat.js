const socketIo = require('socket.io');
const config = require('../config');
const { saveMessage } = require('../controllers/message');

const initChatSocket = (server) => {

    const io = socketIo(server, {
        cors: {
            origin: config.clientURL,
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log('[*] Client connected:', socket.id);

        socket.on('group_chat_join', (userId, groupId) => {
            socket.join(groupId);
            console.log(`[*] User ${userId} joined group ${groupId}`);
        });

        socket.on('group_chat_send_message', async (incoming_message) => {
            const message = await saveMessage(incoming_message);
            console.log(message);
            const groupId = message.groupId.toString();
            io.to(groupId).emit('group_chat_receive_message', message);
        });

        socket.on('disconnect', () => {
            console.log('[!] Client disconnected');
        });
    });
};

module.exports = initChatSocket;
