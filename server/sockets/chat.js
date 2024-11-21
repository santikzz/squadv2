const socketIo = require('socket.io');
const config = require('../config');
const { saveMessage, updateLastRead } = require('../controllers/message');

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


        socket.on('group_chat_join', (data) => {
            const { groupId, userId } = data;
            socket.join(groupId);
            updateLastRead(groupId, userId);
            console.log(`[*] User ${userId} joined group ${groupId}`);
        });

        socket.on('group_chat_send_message', async (incoming_message) => {
            const message = await saveMessage(incoming_message);
            const groupId = message.groupId.toString();
            io.to(groupId).emit('group_chat_receive_message', message);
        });


        socket.on('disconnect', () => {
            console.log('[!] Client disconnected');
        });


    });
};

module.exports = initChatSocket;