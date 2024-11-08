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
import { Image, Pen, Plus, Trash, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import InputNumber from "@/components/InputNumber";
import OptionSwitch from "@/components/OptionSwitch";
import { api } from "@/services/api"
import MainWrapper from "@/components/MainWrapper"
import ButtonLoader from "@/components/ButtonLoader";
import { GlobalContext } from '@/context/GlobalContext';
import { toAvatarFallback } from "@/utils/utils";

const FormSchema = z.object({
    name: z.string({ required_error: 'Ingresa tu nombre' }),
    surname: z.string({ required_error: 'Ingresa tu apellido' }),
    about: z.string().nullable().optional(),
});

export default function UserPage() {

    const { user, isDesktop } = useContext(GlobalContext);
    const [updating, setUpdating] = useState(false);
    // const [deleting, setDeleting] = useState(false);
    // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await api.getUserSelf();
            form.reset({
                name: res.name,
                surname: res.surname,
                about: res.about,
            });
        }
        fetchUser();
    }, []);

    const form = useForm({ resolver: zodResolver(FormSchema) });

    const onSubmit = async (formData) => {
        setUpdating(true);
        const res = await api.updateUser(formData);
        if (res !== null) {
            setRefresh((prev) => prev + 1); //force refresh
        } else {
            console.error(res);
        }
        setUpdating(false);
    };

    const handleDeleteGroup = async () => {
        setDeleting(true);
        // const res = api.deleteGroup(groupId);
        // if (res !== null) {
        //     navigate('/');
        // } else {
        //     console.error(res);
        // }
        setDeleting(false);
    }

    // const DeleteDialog = () => {
    //     if (isDesktop) {
    //         return (
    //             <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
    //                 <AlertDialogContent>
    //                     <AlertDialogHeader>
    //                         <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
    //                         <AlertDialogDescription>
    //                             Esta accion no se puede deshacer
    //                         </AlertDialogDescription>
    //                     </AlertDialogHeader>
    //                     <AlertDialogFooter>
    //                         <AlertDialogCancel>Cancelar</AlertDialogCancel>
    //                         <ButtonLoader
    //                             isLoading={deleting}
    //                             loadingText="Eliminar"
    //                             variant="destructive"
    //                             onClick={handleDeleteGroup}
    //                         >
    //                             <Trash />Eliminar
    //                         </ButtonLoader>
    //                     </AlertDialogFooter>
    //                 </AlertDialogContent>
    //             </AlertDialog>
    //         )
    //     } else {
    //         return (
    //             <Drawer open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
    //                 <DrawerContent>
    //                     <DrawerHeader className="gap-8 py-12 px-8">
    //                         <DrawerTitle className="text-2xl">¿Estas seguro?</DrawerTitle>
    //                         <DrawerDescription className="text-xl"> Esta accion no se puede deshacer</DrawerDescription>
    //                     </DrawerHeader>
    //                     <DrawerFooter className="space-y-4">
    //                         <ButtonLoader
    //                             isLoading={deleting}
    //                             loadingText="Eliminar"
    //                             onClick={handleDeleteGroup}
    //                             className="h-11"
    //                             variant="destructive"
    //                         >
    //                             <Trash />Eliminar
    //                         </ButtonLoader>
    //                         <DrawerClose>
    //                             <Button
    //                                 variant="outline"
    //                                 className="w-full h-10"
    //                             >
    //                                 <X />Cancelar
    //                             </Button>
    //                         </DrawerClose>
    //                     </DrawerFooter>
    //                 </DrawerContent>
    //             </Drawer>
    //         )
    //     }
    // };

    return (
        <MainWrapper>

            {/* <DeleteDialog /> */}

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 justify-between h-full md:h-auto md:space-y-6 lg:mx-[33%]">

                    <div className="flex flex-col gap-4">

                        <div className="flex flex-row space-x-4 items-center">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={user?.image_url} alt="profile" />
                                <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{toAvatarFallback(user?.name, user?.surname)}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline"><Image />Subir foto</Button>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-normal">Nombre</FormLabel>
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
                                name="surname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-normal">Apellido</FormLabel>
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
                                name="about"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-normal">Sobre ti</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="¡Hola!, Yo soy ..." className="resize-none h-48 text-base" {...field} />
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
                            <Pen size={20} /> Editar
                        </ButtonLoader>
                    </div>
                </form>
            </Form>


        </MainWrapper >
    )
}