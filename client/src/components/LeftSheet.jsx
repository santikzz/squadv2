import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, Home, Users, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const LeftSheet = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: "Inicio", to: "/" },
        { icon: Users, label: "Grupos unidos", to: "/groups" },
        { icon: Users, label: "Mis grupos", to: "/groups" },
        { icon: HelpCircle, label: "Ayuda", to: "/support" },
    ]

    return (
        <div className="flex h-full flex-col justify-between pt-10 md:py-6 md:px-4">

            <nav className="space-y-8 md:space-y-4">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => { navigate(item.to) }}
                        variant="ghost"
                        className={`inline-flex items-center gap-2.5 whitespace-nowrap w-full flex-row flex-nowrap justify-start text-lg px-3 py-2 rounded-lg ${location.pathname === item.to ? 'text-black dark:text-white bg-neutral-200 dark:bg-neutral-900 ' : 'text-black dark:text-neutral-300'}`}
                    >
                        <item.icon size={24} />{item.label}
                    </button>
                ))}
            </nav>

        </div>
    );
};

export default LeftSheet;