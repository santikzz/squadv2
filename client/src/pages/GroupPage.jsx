
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, LockOpen, Ellipsis, Users, EllipsisVertical, Clock1, CircleSlash, Forward, MessageCircle, DotIcon, DoorOpen, Pencil } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"

import { api } from "@/services/api";
import MainWrapper from "@/components/MainWrapper"
import HorizontalSeparator from "@/components/HorizontalSeparator";
import { toAvatarFallback, formatTimeAgo } from "@/utils/utils";

export default function GroupPage() {

    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await api.getGroup(groupId);
            setGroup(res);
        }
        fetchGroup();
    }, [refresh]);

    const handleJoin = async () => {
        const res = await api.joinGroup(groupId);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        }
    }

    const handleExitGroup = async () => {
        const res = await api.leaveGroup(groupId);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        }
    }

    const handleGroupEdit = () => {

    }

    const OptionsDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    {(group?.is_member && !group?.is_owner) && (
                        <DropdownMenuItem>
                            <button
                                className="text-base flex flex-row items-center gap-2"
                                onClick={handleExitGroup}
                            >
                                <DoorOpen />
                                Salir del grupo
                            </button>
                        </DropdownMenuItem>
                    )}
                    {group?.is_owner && (
                        <DropdownMenuItem>
                            <button
                                className="text-base flex flex-row items-center gap-2"
                                onClick={handleGroupEdit}
                            >
                                <Pencil />
                                Editar grupo
                            </button>

                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    const OptionsDrawer = () => (
        <Drawer>
            <DrawerTrigger>
                <Ellipsis />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-8 py-12 px-8">
                    <div className="text-xl flex flex-row items-center justify-between gap-4">
                        {(group?.is_member && !group?.is_owner) && (
                            <button
                                className="flex flex-row items-center gap-4"
                                onClick={handleExitGroup}
                            >
                                <DoorOpen />
                                Salir del grupo
                            </button>
                        )}
                        {group?.is_owner && (
                            <button
                                className="flex flex-row items-center gap-4"
                                onClick={handleGroupEdit}
                            >
                                <Pencil />
                                Editar grupo
                            </button>
                        )}
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )

    return (
        <MainWrapper>

            <div className="mx-auto max-w-2xl space-y-s">

                <div className="flex flex-col space-y-4">

                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row gap-2">
                            <Avatar className="bg-gray-200 dark:bg-neutral-700">
                                <AvatarImage src={group?.owner.image_url} alt="profile" />
                                <AvatarFallback>{toAvatarFallback(group?.owner.name, group?.owner.surname)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-row items-center">
                                <Label>{group?.owner.name} {group?.owner.surname}</Label>
                                <DotIcon className="opacity-75" />
                                <Label className="font-normal text-xs opacity-75">{formatTimeAgo(group?.createdAt)}</Label>
                            </div>
                        </div>

                        <div className="hidden md:flex"><OptionsDropdown /></div>
                        <div className="flex md:hidden"><OptionsDrawer /></div>

                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label className="font-semibold text-lg">{group?.title}</Label>
                        <div className="flex flex-row items-center space-x-1 opacity-60">
                            <Clock1 size={12} />
                            <Label className="font-normal text-xs">{formatTimeAgo(group?.createdAt)}</Label>
                        </div>
                    </div>
                    <Label className="font-normal text-base opacity-75">{group?.description}</Label>

                    <div className="flex flex-row justify-start space-x-4">
                        <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5  gap-1.5 shadow-sm min-w-32 justify-center">
                            {group?.privacy === 'private' ? (
                                <>
                                    <Lock size="18" strokeWidth="2" color="white"></Lock>
                                    <Label className="font-semibold text-sm text-white">Grupo privado</Label>
                                </>
                            ) : (
                                <>
                                    <LockOpen size="18" strokeWidth="2" color="white"></LockOpen>
                                    <Label className="font-semibold text-sm text-white">Grupo abierto</Label>
                                </>
                            )}
                        </div>
                        <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 gap-1.5 shadow-sm min-w-16 justify-center">
                            <Users size="18" strokeWidth="2" color="white"></Users>
                            <Label className="font-semibold text-sm text-white">{group?.members.length}{group?.max_members !== null && `/${group?.max_members}`}</Label>
                        </div>
                    </div>

                </div>

                <HorizontalSeparator />
                <div className="pt-2 pb-8">
                    {group?.is_owner || group?.is_member ? (
                        <Button className="h-12 bg-gradient text-white flex-1 w-full">
                            <MessageCircle />
                            Abrir chat
                        </Button>
                    ) : (
                        group?.is_full ? (
                            <Button className="h-12 bg-gradient text-white flex-1 w-full" disabled>
                                <CircleSlash />
                                Grupo lleno
                            </Button>
                        ) : (
                            <Button className="h-12 bg-gradient text-white flex-1 w-full" onClick={handleJoin}>
                                <Forward />
                                {group?.privacy === 'private' ? ('Solicitar unirse') : ('Unirse')}
                            </Button>
                        )
                    )}
                </div>

                <div className="flex flex-col space-y-3">

                    {group?.members.map((member, i) => (

                        <div key={i} className="flex flex-row items-center justify-between w-full">
                            <div className="flex flex-row gap-2">
                                <Avatar className="bg-gray-200 dark:bg-neutral-700">
                                    <AvatarImage src={member?.image_url} alt="profile" />
                                    <AvatarFallback>{toAvatarFallback(member?.name, member?.surname)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-center mt-0">
                                    <Label>{member?.name} {member?.surname}</Label>
                                </div>
                            </div>

                            <div className="p-2" >
                                <EllipsisVertical />
                            </div>

                        </div>

                    ))}
                </div>

            </div>
        </MainWrapper>
    )
}