import MainWrapper from "../components/MainWrapper"
import NotificationJoinRequest from "@/components/notifications/NotificationJoinRequest";
import NotificationSimple from "@/components/notifications/NotificationSimple";

export default function NotificationsPage() {
    return (
        <MainWrapper>
            <NotificationJoinRequest />
            <div className="w-full border-t my-4" />
            <NotificationSimple />
        </MainWrapper>
    )
}