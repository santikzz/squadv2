import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

import MainWrapper from "@/components/MainWrapper"
import NotificationJoinRequest from "@/components/notifications/NotificationJoinRequest";
import NotificationSimple from "@/components/notifications/NotificationSimple";
import NotificationNewMember from "@/components/notifications/NotificationNewMember";
import { api } from "@/services/api";

export default function NotificationsList() {

    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await api.getNotifications();
            setNotifications(res);
        }
        fetchNotifications();
    }, [])

    return (
        <>
            {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                    <>
                        {notification.type === 'join_request' && <NotificationJoinRequest key={notification._id} notification={notification} />}
                        {notification.type === 'new_member' && <NotificationNewMember key={notification._id} notification={notification} />}
                    </>
                ))
            ) : (
                <Label>No tienes notificaciones nuevas</Label>
            )}
        </>
    )
}