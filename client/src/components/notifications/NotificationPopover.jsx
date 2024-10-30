import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Dot } from "lucide-react"
import NotificationJoinRequest from "@/components/notifications/NotificationJoinRequest";
import NotificationSimple from "@/components/notifications/NotificationSimple";
import { Link } from "react-router-dom";


export default function NotificationPopover({ children }) {
    return (
        <>
            <div className="hidden md:flex">
                <Popover>
                    <PopoverTrigger>
                        <div className="relative">
                            <Bell size={24} />
                            <div className="size-2.5 bg-red-500 absolute top-0 right-0 rounded-full" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[600px] mr-[50px]">
                        {children}

                        <NotificationJoinRequest />
                        <div className="w-full border-t my-4" />
                        <NotificationSimple />

                    </PopoverContent>
                </Popover>
            </div>
            <Link to="/notifications" className="relative md:hidden">
                <Bell size={24} />
                <div className="size-2.5 bg-red-500 absolute top-0 right-0 rounded-full" />
            </Link>
        </>
    );
}