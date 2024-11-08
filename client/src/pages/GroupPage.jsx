
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, X, LockOpen, Ellipsis, Users, EllipsisVertical, Clock1, CircleSlash, Forward, MessageCircle, DotIcon, DoorOpen, Pencil, Flag } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import { api } from "@/services/api";
import MainWrapper from "@/components/MainWrapper"
import HorizontalSeparator from "@/components/HorizontalSeparator";
import { formatTimeAgo } from "@/utils/utils";
import { GlobalContext } from '@/context/GlobalContext';
import UserAvatar from "@/components/UserAvatar";
import ButtonLoader from "../components/ButtonLoader";

export default function GroupPage() {

    const { groupId } = useParams();
    const { isDesktop } = useContext(GlobalContext);
    const [group, setGroup] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [isJoining, setIsJoining] = useState(false);
    const [exitDialogOpen, setExitDialogOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await api.getGroup(groupId);
            setGroup(res);
        }
        fetchGroup();
    }, [refresh]);

    const handleJoin = async () => {
        setIsJoining(true);
        const res = await api.joinGroup(groupId);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        }
        setIsJoining(false);
    }


    const handleCancel = async () => {
        setIsJoining(true);
        const res = await api.cancelJoinGroup(groupId);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        }
        setIsJoining(false);
    }

    const handleExitGroup = async () => {
        const res = await api.leaveGroup(groupId);
        setExitDialogOpen(false);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        }
    }

    const handleGroupEdit = () => {
        navigate(`/edit/${groupId}`);
    }

    const handleKickMember = async (userId) => {
        const res = api.kickGroupMember(groupId, userId);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        }
    }

    const GroupOptionsDialog = () => {

        const navItems = [
            {
                label: 'Salir del grupo',
                icon: <DoorOpen />,
                onClick: () => setExitDialogOpen(true),
                condition: group?.is_member && !group?.is_owner,
                disabled: false,
            },
            {
                label: 'Editar grupo',
                icon: <Pencil />,
                onClick: handleGroupEdit,
                condition: group?.is_owner,
                disabled: false,
            },
            {
                label: 'Reportar',
                icon: <Flag />,
                onClick: null,
                condition: !group?.is_owner,
                disabled: true,
            }
        ];

        if (isDesktop) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            {navItems.map(
                                (item, index) =>
                                    item.condition && (
                                        <DropdownMenuItem key={index} disabled={item.disabled}>
                                            <button
                                                className={`flex flex-row items-center gap-2`}
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
            );
        } else {
            return (
                <Drawer>
                    <DrawerTrigger>
                        <Ellipsis />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="gap-8 py-12 px-8">
                            {navItems.map(
                                (item, index) =>
                                    item.condition && (
                                        <button
                                            key={index}
                                            className={`flex flex-row items-center gap-2`}
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
            );
        }
    }

    const ExitGroupDialog = () => {
        if (isDesktop) {
            return (
                <AlertDialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta accion no se puede deshacer
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <ButtonLoader
                                isLoading={isExiting}
                                loadingText="Salir"
                                variant="destructive"
                                onClick={handleExitGroup}
                            >
                                <DoorOpen />Salir
                            </ButtonLoader>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        } else {
            return (
                <Drawer open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
                    <DrawerContent>
                        <DrawerHeader className="gap-8 py-12 px-8">
                            <DrawerTitle className="text-2xl">¿Estas seguro?</DrawerTitle>
                            <DrawerDescription className="text-xl">Esta accion no se puede deshacer</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="space-y-4">
                            <ButtonLoader
                                isLoading={isExiting}
                                loadingText="Salir"
                                onClick={handleExitGroup}
                                className="h-11"
                                variant="destructive"
                            >
                                <DoorOpen />Salir
                            </ButtonLoader>
                            <DrawerClose>
                                <Button
                                    variant="outline"
                                    className="w-full h-10"
                                >
                                    <X />Cancelar
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )
        }
    };

    const MemberOptionsDialog = ({ userId }) => {

        const navItems = [
            {
                label: 'Expulsar',
                icon: <X />,
                onClick: () => handleKickMember(userId),
            }
        ];

        if (isDesktop) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            {navItems.map(
                                (item, index) =>
                                    <DropdownMenuItem key={index}>
                                        <button
                                            className={`flex flex-row items-center gap-2`}
                                            onClick={item.onClick}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    </DropdownMenuItem>
                            )}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        } else {
            return (
                <Drawer>
                    <DrawerTrigger>
                        <EllipsisVertical />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="gap-8 py-12 px-8">
                            {navItems.map(
                                (item, index) =>
                                    <button
                                        key={index}
                                        className={`flex flex-row items-center gap-2`}
                                        onClick={item.onClick}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                            )}
                        </DrawerHeader>
                    </DrawerContent>
                </Drawer>
            );
        }
    }

    return (
        <MainWrapper>

            <ExitGroupDialog />

            <div className="mx-auto max-w-2xl space-y-s">

                <div className="flex flex-col space-y-4">

                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center">
                            <UserAvatar user={group?.owner} />
                        </div>
                        <GroupOptionsDialog />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label className="font-semibold text-lg">{group?.title}</Label>
                        <div className="flex flex-row items-center space-x-1 dark:opacity-60">
                            <Clock1 size={12} />
                            <Label className="font-normal text-xs">{formatTimeAgo(group?.createdAt)}</Label>
                        </div>
                    </div>
                    <Label className="font-normal text-base dark:opacity-75">{group?.description}</Label>

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
                                    <Label className="font-semibold text-sm text-white">Grupo publico</Label>
                                </>
                            )}
                        </div>
                        <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 gap-1.5 shadow-sm min-w-16 justify-center">
                            <Users size="18" strokeWidth="2" color="white"></Users>
                            <Label className="font-semibold text-sm text-white">{group?.total_members}{group?.max_members !== null && `/${group?.max_members}`}</Label>
                        </div>
                    </div>

                </div>

                <HorizontalSeparator />
                <div className="pt-2 pb-8">
                    {group?.is_owner || group?.is_member ? (
                        <Button
                            onClick={() => navigate(`/group/${groupId}/chat`)}
                            className="h-12 bg-gradient text-white flex-1 w-full active:brightness-75 transition-all duration-100"
                        >
                            <MessageCircle />
                            Abrir chat
                        </Button>
                    ) : (
                        group?.is_full ? (
                            <Button className="h-12 bg-gradient text-white flex-1 w-full" disabled>
                                <CircleSlash />
                                Grupo lleno
                            </Button>
                        ) : group?.has_request ? (
                            <ButtonLoader
                                isLoading={isJoining}
                                loadingText="Cancelar solicitud"
                                className="h-12 bg-gradient text-white flex-1 w-full"
                                onClick={handleCancel}
                            >
                                <X />
                                Cancelar solicitud
                            </ButtonLoader>
                        ) : (
                            <ButtonLoader
                                isLoading={isJoining}
                                loadingText={group?.privacy === 'private' ? ('Solicitar unirse') : ('Unirse')}
                                className="h-12 bg-gradient text-white flex-1 w-full"
                                onClick={handleJoin}>
                                <Forward />
                                {group?.privacy === 'private' ? ('Solicitar unirse') : ('Unirse')}
                            </ButtonLoader>
                        )
                    )}
                </div>

                <div className="flex flex-col space-y-3">
                    {group?.members.map((member, i) => (
                        <div key={i} className="flex flex-row items-center justify-between w-full">
                            <UserAvatar user={member} />
                            {group?.is_owner &&
                                <div className="p-2" >
                                    <MemberOptionsDialog userId={member?._id} />
                                </div>
                            }
                        </div>
                    ))}
                </div>

            </div>
        </MainWrapper>
    )
}