import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { io } from 'socket.io-client';
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

import { api } from "@/services/api"
import { GlobalContext } from '@/context/GlobalContext';
import MainWrapper from "@/components/MainWrapper"
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

// "_id": "672e2a44de811f422c54bd97",
// "groupId": "67252393f4cb9e2003c240cf",
// "userId": {
//     "_id": "67154db21733e03724a57305",
//     "name": "John",
//     "surname": "Doe",
//     "image_url": null
// },
// "content": "sdfds",
// "createdAt": "2024-11-08T15:12:04.905Z",
// "updatedAt": "2024-11-08T15:12:04.905Z",
// "__v": 0

const socket = io('http://localhost:3001');

export default function ChatPage() {

    const { groupId } = useParams();
    const { isDesktop, user } = useContext(GlobalContext);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prev) => [...prev, message]);
        }
        socket.on('group_chat_receive_message', messageListener);
        return () => {
            socket.off('group_chat_receive_message', messageListener);
        }
    }, [socket]);

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await api.getMessagesByGroupId(groupId);
            setMessages(res);
        }
        fetchMessages();
        socket.emit("group_chat_join", user._id, groupId);
    }, [groupId]);


    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const _message = {
                groupId: groupId,
                userId: user._id,
                content: input
            }
            socket.emit("group_chat_send_message", _message);
            setInput('');
        }
    }

    return (
        <MainWrapper className="dark:bg-neutral-900 bg-neutral-100 flex flex-col justify-between p-0">
            <div className="w-full h-16 bg-neutral-950 border-b flex px-6 items-center">
                #GroupHeader
            </div>

            <div className="flex-1 overflow-hidden relative pl-4">
                <div className="pl-2 pr-24 h-full overflow-y-scroll pb-6">
                    <MessageList messages={messages} />
                </div>
            </div>

            <div className="px-4 pb-4">
                <form onSubmit={(e) => sendMessage(e)}>
                    <ChatInput
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>
            </div>
        </MainWrapper>
    )
}