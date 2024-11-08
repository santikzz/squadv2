import { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell } from "lucide-react"
import { Link } from "react-router-dom";

import { GlobalContext } from '@/context/GlobalContext';
import NotificationsList from "@/components/notifications/NotificationList";

export default function NotificationPopover() {

    const { isDesktop } = useContext(GlobalContext);

    const BadgeDot = () => (
        <div className="size-2.5 bg-red-500 absolute top-0 right-0 rounded-full" />
    );

    if (isDesktop) {
        return (
            <Popover>
                <PopoverTrigger>
                    <div className="relative">
                        <Bell size={24} />
                        <BadgeDot />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[600px] mr-[50px]">
                    <NotificationsList/>
                </PopoverContent>
            </Popover>
        )
    } else {
        return (
            <Link to="/notifications" className="relative md:hidden">
                <Bell size={24} />
                <BadgeDot />
            </Link>
        );
    }

}