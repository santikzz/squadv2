import { useState, useContext, useEffect } from "react"
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputNumber from "@/components/InputNumber";
import OptionSwitch from "@/components/OptionSwitch";
import { api } from "@/services/api"
import { AuthContext } from '@/context/AuthContext';
import GroupCard from "@/components/GroupCard"
import MainWrapper from "../components/MainWrapper"
import { Plus } from "lucide-react";

const FormSchema = z.object({
    title: z
        .string({
            required_error: "Escribe un titulo.",
        }).max(64, {
            message: "Maximo 64 caracteres",
        }),
    description: z
        .string({
            required_error: "Escribe una descripcion.",
        })
        .max(512, {
            message: "Maximo 512 caracteres",
        }),
    privacy: z.string(),
    max_members: z.number().min(0).max(50),
});

export default function CreateGroupPage() {

    const [creating, setCreating] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            max_members: 0,
            privacy: 'public'
        },
    });

    const onSubmit = async (formData) => {
        setCreating(true);
        const res = await api.createGroup(formData)
        if (res !== null) {
            setCreating(false);
            navigate(`/group/${res._id}`);
        } else {
            console.log(res);
        }
    };

    return (
        <MainWrapper>

            <Form {...form}>

                <div className="px-4 pb-3 lg:mx-[33%]">
                    <Label className="text-2xl">Crear grupo</Label>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 gap-4 lg:mx-[33%]">
                    <div className="grid w-full items-center gap-1.5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Titulo *</FormLabel>
                                    <FormControl>
                                        <Input className="text-base" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Descripcion *</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="busco grupo de estudio para..." className="resize-none h-48 text-base" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <FormField
                            control={form.control}
                            name="privacy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Privacidad</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="privacy"
                                            control={form.control}
                                            render={({ field }) => (
                                                <OptionSwitch
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    optionA='public'
                                                    optionB='private'
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className={`grid w-full items-center gap-1.5 `}>
                        <FormField
                            control={form.control}
                            name="max_members"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Limite de miembros</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="max_members"
                                            control={form.control}
                                            render={({ field }) => (
                                                <InputNumber
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    min={0}
                                                    max={20}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full mt-16">

                        {/* <ButtonLoader isLoading={creating} type="submit">
                            <Plus /> Crear
                        </ButtonLoader> */}

                        <Button className="w-full h-10 text-white text-base bg-gradient"> <Plus size={20} /> Crear</Button>

                    </div>
                </form>
            </Form>


        </MainWrapper>
    )
}