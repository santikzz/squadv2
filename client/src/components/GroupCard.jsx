import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Lock, LockOpen, Clock, Users, Dot, Omega, Ellipsis } from "lucide-react";

import UserAvatar from "@/components/UserAvatar";
import { formatTimeAgo, trimString } from "@/utils/utils";

const GroupCard = ({ group }) => {

    const navigate = useNavigate();

    return (

        <Card
            className="group w-full lg:max-h-[20rem] shadow-md active:brightness-95 flex flex-col rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:cursor-pointer"
            onClick={() => navigate(`/group/${group?._id}`)}
        >

            <div className="flex flex-row items-center p-2 bg-neutral-100 dark:bg-neutral-900 rounded-t-xl border-b group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800">
                <UserAvatar user={group?.owner} />
                <Dot size="16" className="opacity-60" />
                <Label className="font-normal text-xs dark:opacity-60">{formatTimeAgo(group?.createdAt)}</Label>
            </div>

            <div className="flex flex-col px-4 pt-4 gap-1 h-full">
                <Label className="font-semibold text-lg">{group?.title}</Label>
                <Label className="font-normal text-base dark:opacity-75">{trimString(group?.description, 100)}</Label>
            </div>

            <div className="flex flex-row justify-between px-4 py-4">
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
                    <Label className="font-semibold text-sm text-white">
                        {group?.total_members}{group?.max_members !== null && `/${group?.max_members}`}
                    </Label>
                </div>
            </div>

        </Card>
    );

};

export default GroupCard;