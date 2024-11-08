import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, LogOut, Bell, Plus, User, Settings, Moon, ChevronLeft, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import { ModeSwitch } from "@/components/mode-switch";
import { ModeToggle } from "@/components/mode-toggle";
import { GlobalContext } from '@/context/GlobalContext';
import { squad_logo_black, squad_logo_white, squad_icon_256 } from "@/Assets"
import LeftSheet from "@/components/LeftSheet";
import NotificationPopover from "@/components/notifications/NotificationPopover";
import { toAvatarFallback } from "@/utils/utils";
import useDebounce from '@/hooks/useDebounce';
import SearchInput from "@/components/SearchInput";

const Header = () => {

    const { user, logout, isDesktop, search, setSearch } = useContext(GlobalContext);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const searchRef = useRef();
    const [_search, _setSearch] = useState("");                                         // local search input state
    const debouncedSearch = () => { setSearch(_search); };                              // callback fn to set global context search value
    const [isReady, cancel] = useDebounce(debouncedSearch, 600, [_search]);             // create the 600ms debounce

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    }

    const CustomAvatar = () => (
        <Avatar className="cursor-pointer">
            <AvatarImage src={user?.image_url} alt="profile" />
            <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
        </Avatar>
    )

    const AvatarDialogMenu = () => {

        const navItems = [
            {
                label: 'Ver Perfil',
                icon: <User />,
                onClick: () => { navigate(`/user/${user._id}`) },
                condition: true,
            },
            {
                label: 'Opciones',
                icon: <Settings />,
                onClick: () => { navigate('/settings') },
                condition: true,
            },
            {
                label: 'Cerrar sesion',
                icon: <LogOut />,
                onClick: handleLogout,
                condition: true,
            }
        ];

        if (isDesktop) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CustomAvatar />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            {navItems.map(
                                (item, index) =>
                                    item.condition && (
                                        <DropdownMenuItem key={index}>
                                            <button
                                                className={`text-base flex flex-row items-center gap-2`}
                                                onClick={item.onClick}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </button>
                                        </DropdownMenuItem>
                                    )
                            )}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        } else {
            return (
                <Drawer>
                    <DrawerTrigger>
                        <CustomAvatar />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="gap-8 py-12 px-8">

                            <div className="flex flex-row items-center gap-2">
                                <CustomAvatar />
                                <Label className="text-lg">{user?.name} {user?.surname}</Label>
                            </div>

                            <div className="text-xl flex flex-row items-center justify-between gap-4">
                                <div className="flex flex-row items-center gap-4">
                                    <Moon size={24} /> Modo oscuro
                                </div>
                                <ModeSwitch />
                            </div>

                            {navItems.map(
                                (item, index) =>
                                    item.condition && (
                                        <button
                                            key={index}
                                            className={`text-xl flex flex-row items-center gap-2`}
                                            onClick={item.onClick}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    )
                            )}

                        </DrawerHeader>
                    </DrawerContent>
                </Drawer>
            )

        }
    }

    return (
        <header className="flex items-center justify-between md:justify-between border-b px-4 py-3">
            {isSearchOpen && !isDesktop ? (
                // <SearchHeader />
                <div className="flex flex-row items-center justify-between space-x-4 pl-2 pr-4 flex-1">
                    <button onClick={() => setIsSearchOpen(false)}><ArrowLeft /></button>
                    <SearchInput value={_search} setValue={_setSearch} cancel={cancel} />
                </div>

            ) : (
                // <BaseHeader />
                <>
                    <div className="flex flex-row items-center space-x-4 md:space-x-0">
                        <div className="flex items-center md:hidden">
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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

                        <Link to="/" className="flex flex-row items-center space-x-2 hover:brightness-75 transition-all duration-100">
                            <img src={squad_icon_256} className="h-10" alt="SQUAD" />
                            <span className="hidden md:flex">
                                <img src={squad_logo_white} className="hidden dark:flex h-10" alt="SQUAD" />
                                <img src={squad_logo_black} className="dark:hidden h-10" alt="SQUAD" />
                            </span>
                        </Link>
                    </div>

                    <div className="items-center space-x-2 hidden md:flex">
                        <SearchInput value={_search} setValue={_setSearch} cancel={cancel} />
                    </div>

                    <div className="flex flex-row items-center space-x-6">

                        <button className="md:hidden" onClick={() => setIsSearchOpen(true)}><Search size={24} /></button>

                        <Button className="hidden md:flex bg-gradient text-white text-base active:brightness-75 transition-all duration-100 hover:cursor-pointer" onClick={() => { navigate('/create') }}>
                            <Plus size={24} />Nuevo grupo
                        </Button>
                        <button className="md:hidden flex flex-row items-center md:bg-gradient dark:text-white text-black" onClick={() => { navigate('/create') }}>
                            <Plus size={24} />
                        </button>

                        <NotificationPopover />

                        <div className="items-center space-x-2 hidden md:flex">
                            <ModeToggle />
                        </div>

                        <AvatarDialogMenu />

                    </div>
                </>

            )}
        </header>
    )

}

export default Header;