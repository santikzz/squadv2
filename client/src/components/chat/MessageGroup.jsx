import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toAvatarFallback } from "@/utils/utils";
import Message from "@/components/chat/Message";

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

export default function MessageGroup({ message, isNewGroup, ...props }) {

    const { userId: user, content, createdAt: timestamp } = message;

    return (
        <div {...props} className={`flex flex-col ${isNewGroup && 'mt-6'}`}>
            {isNewGroup && (
                <div className="flex flex-row items-center gap-2">
                    <Avatar>
                        <AvatarImage src={user?.image_url} alt="profile" />
                        <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
                    </Avatar>
                    <Label className="text-sm">{user?.name} {user?.surname}</Label>
                    <Label className="text-sm timestamp opacity-75">{new Date(timestamp).toLocaleTimeString()}</Label>
                </div>
            )}
            <div className={`ml-10 px-4 rounded-lg`}>
                <Message content={content} />
            </div>
        </div>
    );

}