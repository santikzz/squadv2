import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import InputNumber from "@/components/InputNumber";
import OptionSwitch from "@/components/OptionSwitch";
import { api } from "@/services/api"
import MainWrapper from "../components/MainWrapper"
import ButtonLoader from "@/components/ButtonLoader";
import { GlobalContext } from '@/context/GlobalContext';


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

export default function EditGroupPage() {

    const { groupId } = useParams();
    const { isDesktop } = useContext(GlobalContext);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await api.getGroup(groupId);
            form.reset({
                title: res.title,
                description: res.description,
                privacy: res.privacy,
                max_members: res.max_members,
            });
        }
        fetchGroup();
    }, []);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            max_members: 0,
            privacy: 'public'
        },
    });

    const onSubmit = async (formData) => {
        setUpdating(true);
        const res = await api.updateGroup(groupId, formData);
        if (res !== null) {
            navigate(`/group/${res._id}`);
        } else {
            console.error(res);
        }
        setUpdating(false);
    };

    const handleDeleteGroup = async () => {
        setDeleting(true);
        const res = api.deleteGroup(groupId);
        if (res !== null) {
            navigate('/');
        } else {
            console.error(res);
        }
        setDeleting(false);
    }

    const DeleteDialog = () => {
        if (isDesktop) {
            return (
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
                                isLoading={deleting}
                                loadingText="Eliminar"
                                variant="destructive"
                                onClick={handleDeleteGroup}
                            >
                                <Trash />Eliminar
                            </ButtonLoader>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        } else {
            return (
                <Drawer open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DrawerContent>
                        <DrawerHeader className="gap-8 py-12 px-8">
                            <DrawerTitle className="text-2xl">¿Estas seguro?</DrawerTitle>
                            <DrawerDescription className="text-xl"> Esta accion no se puede deshacer</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="space-y-4">
                            <ButtonLoader
                                isLoading={deleting}
                                loadingText="Eliminar"
                                onClick={handleDeleteGroup}
                                className="h-11"
                                variant="destructive"
                            >
                                <Trash />Eliminar
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

    return (
        <MainWrapper>

            <DeleteDialog />

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 justify-between h-full md:h-auto md:space-y-6 lg:mx-[33%]">

                    <div className="flex flex-col gap-4">
                        <div className="px-4 pb-3 lg:mx-[33%]">
                            <Label className="text-2xl">Crear grupo</Label>
                        </div>

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
                    </div>

                    <div className="w-full flex flex-col space-y-6 pb-4">

                        <ButtonLoader
                            type="submit"
                            isLoading={updating}
                            loadingText='Editar'
                            className="w-full h-11 text-white text-base bg-gradient">
                            <Plus size={20} /> Editar
                        </ButtonLoader>

                        <Button
                            type="button"
                            variant="outline"
                            className="border-red-500 w-full h-11"
                            onClick={() => { setDeleteDialogOpen(true) }}
                        >
                            <Trash size={20} />
                            Eliminar grupo
                        </Button>
                    </div>
                </form>
            </Form>


        </MainWrapper >
    )
}