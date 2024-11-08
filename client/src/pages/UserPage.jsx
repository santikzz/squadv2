import { useState, useContext, useEffect } from "react"
import { api } from "@/services/api"
import { GlobalContext } from '@/context/GlobalContext';
import { Link, useNavigate, useParams } from "react-router-dom"
import GroupCard from "@/components/GroupCard"
import MainWrapper from "@/components/MainWrapper"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Frown, Mail, Pen, Pencil, User } from "lucide-react"
import HorizontalSeparator from "@/components/HorizontalSeparator"

import { toAvatarFallback } from "@/utils/utils";

export default function UserPage() {

    const { user: self } = useContext(GlobalContext);
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState(null);

    useEffect(() => {
        const fetchUserSelf = async () => {
            const res = await api.getUser(userId);
            setUser(res);
        }
        const fetchGroups = async () => {
            const res = await api.getUserOwnedGroups(userId);
            setGroups(res);
        }
        fetchGroups();
        fetchUserSelf();
    }, [])


    return (
        <MainWrapper>

            <div className="flex flex-row items-center space-x-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.image_url} alt="profile" />
                    <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center space-x-4">
                        <Label className="text-3xl font-bold">{user?.name} {user?.surname}</Label>
                        {self?._id === userId &&
                            <Link to="/profile" className="inline-flex items-center gap-1 "><Pen size={16} />Editar</Link>
                        }
                    </div>
                    <div className="flex items-center space-x-2 opacity-50">
                        <Mail size={14} />
                        <Label className="text-sm font-normal">{user?.email}</Label>
                    </div>
                    <div className="flex items-center space-x-2 opacity-50">
                        <CalendarIcon size={14} />
                        <Label className="text-sm font-normal">Miembro desde {new Date(user?.createdAt).toLocaleDateString()}</Label>
                    </div>
                </div>
            </div>

            <HorizontalSeparator />

            {!groups && (
                <div className="flex flex-row items-center space-x-2 opacity-50">
                    <Label className="text-xl font-normal">Parece que {user?.name} no tiene ningun grupo</Label>
                </div>
            )}
            <div className="mx-auto max-w-2xl space-y-4">
                {groups && groups.map((group, i) => (
                    <GroupCard group={group} key={i} />
                ))}
            </div>

        </MainWrapper>
    )
}