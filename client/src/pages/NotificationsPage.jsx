import MainWrapper from "../components/MainWrapper"
import NotificationJoinRequest from "@/components/notifications/NotificationJoinRequest";
import NotificationSimple from "@/components/notifications/NotificationSimple";
import NotificationsList from "@/components/notifications/NotificationList";

export default function NotificationsPage() {
    return (
        <MainWrapper>
            <NotificationsList />
        </MainWrapper>
    )
}