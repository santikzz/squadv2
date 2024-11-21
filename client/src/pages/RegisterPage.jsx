import { useState, useContext, useRef } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { Progress } from "@/components/ui/progress"
import PasswordInputStrength from "@/components/PasswordInputStrength"

import { api } from '@/services/api'
import { squad_logo_black, squad_logo_white, squad_icon_256, login_background } from "@/Assets"
import { GlobalContext } from '@/context/GlobalContext';
import { ArrowLeft, ArrowRight, KeyRoundIcon, Lock, LogIn, Mail, User } from 'lucide-react'

const formSchemaStep1 = z.object({
    email: z.string({ required_error: 'Ingrese un email' }).email({ message: 'Ingresa un email valido' }),
    password: z.string({ required_error: 'Ingrese una contraseña' })
        .min(6, { message: 'Contraseña debe ser al menos 6 caracteres' })
        .regex(/[A-Z]/, { message: 'Contraseña debe contener al menos una mayúscula' })
        .regex(/[\W_]/, { message: 'Contraseña debe contener al menos un símbolo' }),
    password_confirmation: z.string({ required_error: 'Repita la contraseña' }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
});

const formSchemaStep2 = z.object({
    name: z.string({ required_error: 'Ingresa tu nombre' }),
    surname: z.string({ required_error: 'Ingresa tu apellido' }),
});

export default function RegisterPage() {

    const { isAuthenticated } = useContext(GlobalContext);
    const navigate = useNavigate();

    const formStep1 = useForm({ resolver: zodResolver(formSchemaStep1) });
    const formStep2 = useForm({ resolver: zodResolver(formSchemaStep2) });
    // const formStep3 = useForm({resolver: zodResolver(formSchemaStep3)});

    const formRefStep1 = useRef(null);
    const formRefStep2 = useRef(null);
    const { trigger } = formStep1; // to check if form is valid before next step

    const registerSubmit = async () => {

        const form1values = formStep1.getValues();
        const form2values = formStep2.getValues();
        const userdata = { ...form1values, ...form2values };

        const res = await api.registerUser(userdata);
        if (res) {
            console.log(res);
        } else {
            console.error('error');
        }

    }

    const [step, setStep] = useState(1)
    const nextStep = async () => {
        const formIsValid = await trigger();
        if (formIsValid)
            setStep(step + 1)
    }
    const prevStep = () => setStep(step - 1)

    if (isAuthenticated) return <Navigate to="/" replace />

    return (

        <div className='md:min-h-[100vh] md:min-w-[100vw] md:flex md:flex-row md:justify-between'>

            <div className='flex-1 hidden md:flex polygon relative'>
                <img src={login_background} className='w-full h-full dark:opacity-75' />

                <div className='absolute flex flex-col gap-6 mt-[15%] ml-12 max-w-[60%]'>
                    <Label className="text-6xl font-bold text-white">¡Bienvenido a Squad!</Label>
                    <Label className="text-2xl font-normal text-white opacity-85">Con Squad, forma y descubre grupos de estudio de manera fácil y rápida. Conéctate con compañeros, colabora y maximiza tu aprendizaje.</Label>
                </div>

            </div>

            <div className="flex flex-col min-h-[90vh] md:min-h-screen mt-auto items-center justify-center md:px-32">

                <div className="flex flex-row items-center space-x-2 mb-4">
                    <img src={squad_icon_256} className="h-16" alt="SQUAD" />
                    <img src={squad_logo_white} className="hidden dark:flex h-16" alt="SQUAD" />
                    <img src={squad_logo_black} className="dark:hidden h-16" alt="SQUAD" />
                </div>

                {step === 1 && (
                    <Form {...formStep1}>
                        <form ref={formRefStep1} className="space-y-4 mx-auto w-[90vw] md:w-[370px]">
                            {/* onSubmit={formStep1.handleSubmit(onSubmit)} */}
                            <>
                                <Card className="w-full">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Paso 1 de 3</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <FormField
                                                control={formStep1.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className="grid gap-2">
                                                        <FormLabel htmlFor="email" className="inline-flex items-center gap-1">
                                                            <Mail size={14} />
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="email"
                                                                placeholder="example@mail.com"
                                                                type="email"
                                                                autoComplete="email"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={formStep1.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem className="grid gap-2">
                                                        <div className="flex justify-between items-center">
                                                            <FormLabel htmlFor="password" className="inline-flex items-center gap-1">
                                                                <Lock size={14} />
                                                                Contraseña
                                                            </FormLabel>
                                                        </div>
                                                        <FormControl>

                                                            <PasswordInputStrength
                                                                id="password"
                                                                placeholder="******"
                                                                autoComplete="password"
                                                                {...field}
                                                            />

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={formStep1.control}
                                                name="password_confirmation"
                                                render={({ field }) => (
                                                    <FormItem className="grid gap-2">
                                                        <div className="flex justify-between items-center">
                                                            <FormLabel htmlFor="password_confirmation" className="inline-flex items-center gap-1">
                                                                <Lock size={14} />
                                                                Repite la contraseña
                                                            </FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <PasswordInput
                                                                id="password_confirmation"
                                                                placeholder="******"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" className="w-full" onClick={nextStep}>
                                                Siguente
                                                <ArrowRight />
                                            </Button>
                                        </div>

                                        <div className="mt-4 text-center text-sm">
                                            ¿Ya tienes cuenta?{' '}
                                            <Link to='/login' className="underline">
                                                Iniciar sesion
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        </form>
                    </Form>
                )}

                {step === 2 && (
                    <Form {...formStep2}>
                        <form ref={formRefStep2} className="space-y-4 mx-auto w-[90vw] md:w-[370px]">
                            {/* onSubmit={formStep2.handleSubmit(onSubmit)} */}
                            <>
                                <Card className="w-full">
                                    <CardHeader className="flex flex-row items-center space-x-2">
                                        <button className='hover:opacity-75' onClick={prevStep}><ArrowLeft size={32} /></button>
                                        <CardTitle className="text-2xl">Paso 2 de 3</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <FormField
                                                control={formStep2.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem className="grid gap-2">
                                                        <FormLabel htmlFor="name" className="inline-flex items-center gap-1">
                                                            <User size={14} />
                                                            Nombre
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="name"
                                                                type="text"
                                                                placeholder="tu nombre"
                                                                autoComplete="name"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={formStep2.control}
                                                name="surname"
                                                render={({ field }) => (
                                                    <FormItem className="grid gap-2">
                                                        <div className="flex justify-between items-center">
                                                            <FormLabel htmlFor="surname" className="inline-flex items-center gap-1">
                                                                <User size={14} />
                                                                Apellido
                                                            </FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <Input
                                                                id="surname"
                                                                placeholder="tu apellido"
                                                                autoComplete="surname"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" className="w-full" onClick={registerSubmit}>
                                                Registrarme
                                                <ArrowRight />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                            </>
                        </form>
                    </Form>
                )}

                {/* {step === 3 && (
                    <Form {...formStep1}>
                        <form ref={formRefStep1} onSubmit={formStep1.handleSubmit(onSubmit)} className="space-y-4 mx-auto w-[90vw] md:w-[370px]">
                            <>
                                <Card className="w-full">
                                    <CardHeader className="flex flex-row items-center space-x-2">
                                        <button className='hover:opacity-75' onClick={prevStep}><ArrowLeft size={32} /></button>
                                        <CardTitle className="text-2xl">Paso 3 de 3</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem className="grid gap-2">
                                                        <FormLabel htmlFor="name" className="inline-flex items-center gap-1">
                                                            <User size={14} />
                                                            Establecimiento
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="name"
                                                                type="text"
                                                                placeholder="tu facultad o escuela"
                                                                autoComplete="name"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" className="w-full" onClick={nextStep}>
                                                Registrarme
                                                <ArrowRight />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                            </>
                        </form>
                    </Form>
                )} */}

                <div className='flex w-full mt-4 flex-col items-center justify-center space-y-3 px-4'>
                    <Label className="text-base">{step} de 3</Label>
                    <Progress value={33.3 * step} />
                </div>



            </div>


        </div>

    )
}