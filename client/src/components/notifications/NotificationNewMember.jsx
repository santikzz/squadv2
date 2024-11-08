import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

import { formatTimeAgo } from "@/utils/utils";

export default function NotificationNewMember({ notification, ...props }) {
    return (
        <div className="group flex flex-row space-x-4 p-2" {...props}>
            <UserPlus size={48} className="text-blue-500" />
            <div className="ml-11 flex flex-col space-y-2">
                <Label className="font-normal text-base">
                    <Link className="font-semibold hover:underline">{notification?.sender.name} {notification?.sender.surname}</Link>
                    {' '}se ha unido a tu grupo{' '}
                    <Link className="font-semibold hover:underline" to={`/group/${notification?.groupId._id}`}>'{notification?.groupId.title}'</Link>
                </Label>
                <Label className="opacity-75 font-normal text-xs">{formatTimeAgo(notification?.createdAt)}</Label>
            </div>
        </div>
    );
}