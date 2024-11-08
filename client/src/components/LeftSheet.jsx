import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Search, Home, Users, Settings, HelpCircle, LogOut, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { api } from "@/services/api"
import HorizontalSeparator from "@/components/HorizontalSeparator"

const LeftSheet = () => {

    const [groups, setGroups] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await api.getSelfGroups();
            setGroups(res);
        }
        fetchGroups();
    }, [])

    const navItems = [
        { icon: Home, label: "Inicio", to: "/" },
        // { icon: Users, label: "Grupos unidos", to: "/groups" },
        // { icon: Users, label: "Mis grupos", to: "/groups" },
        // { icon: HelpCircle, label: "Ayuda", to: "/support" },
    ]

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

                {groups?.map((group, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(`/group/${group._id}/chat`)}
                        className="group w-full flex flex-row items-center text-left gap-2 py-3 px-2 rounded-md hover:bg-neutral-900 hover:cursor-pointer"
                    >
                        <div className="relative">
                            <Avatar className="group-hover:cursor-pointer">
                                <AvatarImage src="" alt="profile" />
                                <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">GR</AvatarFallback>
                            </Avatar>
                            <Dot className="h-20 w-20 text-red-500 absolute -left-1.5 -bottom-1.5" />
                        </div>
                        <Label className="text-sm group-hover:cursor-pointer">{group?.title}</Label>
                    </button>
                ))}

            </nav>

        </div>
    );
};

export default LeftSheet;