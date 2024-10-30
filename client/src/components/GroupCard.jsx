import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Lock, LockOpen, Clock, Users, Dot, Omega, Ellipsis } from "lucide-react";

import { toAvatarFallback, formatTimeAgo, trimString } from "@/utils/utils";

// import { FormatTimeAgo, trimString } from "@/components/services/Utils";
// import { api } from "./services/Api";

const GroupCard = ({ group }) => {

    const navigate = useNavigate();

    return (

        <Card
            className="w-full lg:max-h-[20rem] shadow-md active:brightness-95 flex flex-col rounded-xl"
            onClick={() => navigate(`/group/${group?._id}`)}
        >

            <div className="flex flex-row items-center gap-2 p-2 bg-gray-100 dark:bg-neutral-900 rounded-t-xl border-b">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={group?.owner.image_url} alt="profile" />
                    <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(group?.owner.name, group?.owner.surname)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-start items-center space-x">
                        <Label className="font-normal text-sm">{group?.owner.name} {group?.owner.surname}</Label>
                        <Dot size="16" className="opacity-60" />
                        <Label className="font-normal text-xs opacity-60">{formatTimeAgo(group?.createdAt)}</Label>
                    </div>
                    <div className="flex flex-row justify-start items-center w-full opacity-60">
                        <Label className="font-normal text-xs">#establishment</Label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 pt-4 gap-1 h-full">
                <Label className="font-semibold text-lg">{group?.title}</Label>
                <Label className="font-normal text-base opacity-75">{group?.description}</Label>
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
                            <Label className="font-semibold text-sm text-white">Grupo abierto</Label>
                        </>
                    )}
                </div>
                <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 gap-1.5 shadow-sm min-w-16 justify-center">
                    <Users size="18" strokeWidth="2" color="white"></Users>
                    <Label className="font-semibold text-sm text-white">
                        {group?.members.length}{group?.max_members !== null && `/${group?.max_members}`}
                    </Label>
                </div>
            </div>

        </Card>
    );

};

export default GroupCard;