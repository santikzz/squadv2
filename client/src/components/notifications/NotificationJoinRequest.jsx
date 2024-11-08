import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, UserPlus, X } from "lucide-react";

import { api } from "@/services/api";
import { formatTimeAgo } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function NotificationJoinRequest({ notification, ...props }) {

    const [show, setShow] = useState(true);

    useEffect(() => {
    }, [show])

    const handleRequest = async (action) => {
        const res = await api.manageJoinRequest(notification?.groupId._id, notification?.sender._id, action);
        setShow(false);
    }

    if (show) return (
        <div className="group flex flex-row space-x-4 p-2 hover:bg-neutral-900 rounded-md" {...props}>
            <UserPlus size={48} className="text-blue-500" />
            <div className="flex flex-col space-y-2">
                <Label className="font-normal text-base">
                    <Link className="font-semibold hover:underline">{notification?.sender.name} {notification?.sender.surname}</Link>
                    {' '}ha solicitado unirse a tu grupo{' '}
                    <Link className="font-semibold hover:underline" to={`/group/${notification?.groupId._id}`}>'{notification?.groupId.title}'</Link>
                </Label>
                <Label className="opacity-75 font-normal text-xs">{formatTimeAgo(notification?.createdAt)}</Label>
                <div className="flex flex-row justify-between gap-4">
                    <Button onClick={() => handleRequest('decline')} type="button" variant="outline" className="flex-1 border-red-500 opacity-60 hover:opacity-100 transition-opacity duration-100"><X />Rechazar</Button>
                    <Button onClick={() => handleRequest('accept')} type="button" variant="outline" className="flex-1 border-green-500 opacity-60 hover:opacity-100 transition-opacity duration-100"><Check /> Aceptar</Button>
                </div>
            </div>
        </div>
    )
}