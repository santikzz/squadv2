import { useState, useContext, useEffect } from "react"
import { Menu, Search, Home, Users, Settings, HelpCircle, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

import { api } from "@/services/api"
import { AuthContext } from '@/context/AuthContext';
import { squad_logo_black, squad_logo_white, squad_icon_256 } from "../Assets"
import { Link, useNavigate } from "react-router-dom"
import GroupCard from "@/components/GroupCard"
import LeftSheet from "@/components/LeftSheet";
import Header from "@/components/Header"

export default function HomePage() {

    const [isOpen, setIsOpen] = useState(false);
    const [groups, setGroups] = useState([]);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchGroups = async () => {
            const res = await api.getGroups();
            setGroups(res);
        }
        fetchGroups();
    }, [])

    return (

        <div className="flex h-screen flex-col">

            {/* Top Navbar */}
            <Header />

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left Sheet (visible on larger screens) */}
                <aside className="hidden w-64 flex-shrink-0 border-r md:block">
                    <LeftSheet />
                </aside>

                {/* Center Feed */}
                <main className="flex-1 overflow-y-auto p-4">

                    <div className="mx-auto max-w-2xl space-y-4">
                        {[...Array(5)].map((_, i) => (
                            groups.map((group, i) => (
                                <GroupCard group={group} key={i} />
                            ))
                        ))}
                    </div>

                </main>
            </div>
        </div>
    )
}