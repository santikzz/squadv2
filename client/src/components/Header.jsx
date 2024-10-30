import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, LogOut, Bell, Plus, User, Settings, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import { ModeSwitch } from "@/components/mode-switch";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthContext } from '@/context/AuthContext';
import { squad_logo_black, squad_logo_white, squad_icon_256 } from "@/Assets"
import LeftSheet from "@/components/LeftSheet";
import NotificationPopover from "@/components/notifications/NotificationPopover";
import { toAvatarFallback } from "../utils/utils";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const navItems = [
        { icon: User, label: "Perfil", to: "/profile" },
        { icon: Settings, label: "Opciones", to: "/settings" },
    ]

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    }

    const AvatarDropdownMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.image_url} alt="profile" />
                    <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.name} {user?.surname} {user?.surname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <DropdownMenuItem key={index}>
                            <button
                                key={index}
                                onClick={() => { navigate(item.to) }}
                                className="text-base flex flex-row items-center gap-2"
                            >
                                <item.icon size={16} />{item.label}
                            </button>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem>
                        <button
                            onClick={handleLogout}
                            className="text-base flex flex-row items-center gap-2"
                        >
                            <LogOut size={16} />Cerrar sesion
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const AvatarDrawerMenu = () => (
        <Drawer>
            <DrawerTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.image_url} alt="profile" />
                    <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
                </Avatar>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-8 py-12 px-8">

                    <div className="flex flex-row items-center gap-2">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user?.image_url} alt="profile" />
                            <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
                        </Avatar>
                        <Label className="text-lg">{user?.name} {user?.surname}</Label>
                    </div>

                    <div className="text-xl flex flex-row items-center justify-between gap-4">
                        <div className="flex flex-row items-center gap-4">
                            <Moon size={24} /> Modo oscuro
                        </div>
                        <ModeSwitch />
                    </div>

                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => { navigate(item.to) }}
                            className="text-xl flex flex-row items-center gap-2"
                        >
                            <item.icon size={24} />{item.label}
                        </button>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="text-xl flex flex-row items-center gap-2"
                    >
                        <LogOut size={24} />Cerrar sesion
                    </button>

                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )



    return (
        <header className="flex items-center justify-between md:justify-between border-b px-4 py-3">

            <div className="flex flex-row items-center space-x-4 md:space-x-0">
                <div className="flex items-center md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <button>
                                <Menu size={30} />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                            <LeftSheet />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex flex-row items-center space-x-2">
                    <img src={squad_icon_256} className="h-10" alt="SQUAD" />
                    <span className="hidden md:flex">
                        <img src={squad_logo_white} className="hidden dark:flex h-10" alt="SQUAD" />
                        <img src={squad_logo_black} className="dark:hidden h-10" alt="SQUAD" />
                    </span>
                </div>
            </div>

            <div className="items-center space-x-2 hidden md:flex">
                <div className="flex flex-row items-center space-x-2 bg-neutral-200 dark:bg-neutral-900 p-2 rounded-full">
                    <Search size={24} className="text-neutral-400 dark:text-neutral-500" />
                    <input type="search" placeholder="Buscar..." className="bg-transparent border-none outline-none w-80 text-black dark:text-white" />
                </div>
            </div>

            <div className="flex flex-row items-center space-x-6">

                <button className="md:hidden"><Search size={24} /></button>

                <Button className="hidden md:flex flex-row items-center bg-gradient text-white" onClick={() => { navigate('/create') }}><Plus size={24} /><Label className="text-base">Nuevo grupo</Label></Button>
                <button className="md:hidden flex flex-row items-center md:bg-gradient dark:text-white text-black" onClick={() => { navigate('/create') }}><Plus size={24} /></button>

                <NotificationPopover />

                <div className="items-center space-x-2 hidden md:flex">
                    <ModeToggle />
                </div>

                <div className="hidden md:flex"><AvatarDropdownMenu /></div>
                <div className="flex md:hidden"><AvatarDrawerMenu /></div>


                {/* <Avatar>
                    <AvatarImage src={user?.image_url} alt="profile" />
                    <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">AB</AvatarFallback>
                </Avatar> */}

            </div>

        </header>
    )

}

export default Header;