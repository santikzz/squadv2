import MessageGroup from "@/components/chat/MessageGroup";

export default function MessageList({ messages }) {
    
    return (
        <div className="">
            {messages.map((message, index) => {
                const isNewGroup =
                    index === 0 ||
                    message?.userId._id !== messages[index - 1]?.userId._id ||
                    new Date(message?.timestamp) - new Date(message[index - 1]?.timestamp) > 300000; // 5 minutes

                return (
                    <MessageGroup
                        key={index}
                        message={message}
                        isNewGroup={isNewGroup}
                    />
                );
            })}
        </div>
    )
}