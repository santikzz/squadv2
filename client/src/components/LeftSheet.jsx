import { useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Search, Home, Users, Settings, HelpCircle, LogOut, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { api } from "@/services/api"
import HorizontalSeparator from "@/components/HorizontalSeparator"
import { GlobalContext } from "@/context/GlobalContext"

const LeftSheet = () => {

    const { ownedJoinedGroups } = useContext(GlobalContext);

    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: "Inicio", to: "/" },
        // { icon: Users, label: "Grupos unidos", to: "/groups" },
        // { icon: Users, label: "Mis grupos", to: "/groups" },
        // { icon: HelpCircle, label: "Ayuda", to: "/support" },
    ]

    const handleGroupClick = (groupId, index) => {
        navigate(`/group/${groupId}/chat`);
    }

    return (
        <div className="flex h-full flex-col justify-between pt-10 md:py-6 md:px-4">

            <nav className="space-y-8 md:space-y-4">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => { navigate(item.to) }}
                        variant="ghost"
                        className={`inline-flex items-center gap-2.5 whitespace-nowrap w-full flex-row flex-nowrap justify-start text-lg px-3 py-2 rounded-lg hover:opacity-75`}
                    >
                        <item.icon size={24} />{item.label}
                    </button>
                ))}

                <HorizontalSeparator />

                {ownedJoinedGroups?.map((group, index) => (
                    <button
                        key={index}
                        onClick={() => handleGroupClick(group._id, index)}
                        className="group w-full flex flex-row items-center text-left gap-2 py-3 px-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900 hover:cursor-pointer relative transition-colors duration-100 ease-in-out"
                    >
                        <div className={`w-2.5 absolute -left-4 rounded-r bg-gradient transition-all duration-100 ease-linear ${location.pathname.includes(group._id) ? 'h-full opacity-100' : 'h-0 opacity-0'}`}></div>

                        <div className="relative">
                            <Avatar className="group-hover:cursor-pointer">
                                <AvatarImage src="" alt="profile" />
                                <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">
                                    <Users className="text-gray-400 dark:text-neutral-500" />
                                </AvatarFallback>
                            </Avatar>
                            {group?.unread_messages > 0 &&
                                <Dot className="h-20 w-20 text-red-500 absolute -left-1.5 -bottom-1.5" />
                            }
                        </div>
                        <Label className="text-sm group-hover:cursor-pointer">{group?.title}</Label>
                    </button>
                ))}

            </nav>

        </div>
    );
};

export default LeftSheet;