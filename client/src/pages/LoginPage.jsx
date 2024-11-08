import { useState, useContext } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'

import { api } from '@/services/api'
import { squad_logo_black, squad_logo_white, squad_icon_256, login_background } from "@/Assets"
import { GlobalContext } from '@/context/GlobalContext';
import { Lock, LogIn, Mail } from 'lucide-react'

const formSchema = z.object({
    email: z.string({ required_error: 'Ingrese su email' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Ingrese su contraseña' })
});

export default function LoginPage() {

    const { loading, login, isAuthenticated } = useContext(GlobalContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const form = useForm({ resolver: zodResolver(formSchema) })

    const onSubmit = async (userdata) => {
        setError(null);
        try {
            const token = await api.basicLogin(userdata);
            if (token) {
                login(token)
                navigate('/', { replace: true });
            }
        } catch (err) {
            setError('Email y/o contraseña invalidos');
        }

    }

    const signInGoogle = () => {
        // window.location.href = 'https://squadv2-api.xnebula.duckdns.org/auth/google';
        window.location.href = 'http://localhost:3000/auth/google';
    }

    if (isAuthenticated && !loading) return <Navigate to="/" replace />

    return (

        <div className='md:min-h-[100vh] md:min-w-[100vw] md:flex md:flex-row md:justify-between'>

            <div className='flex-1 hidden md:flex polygon relative'>
                <img src={login_background} className='w-full h-full dark:opacity-75' />

                <div className='absolute flex flex-col gap-6 mt-[15%] ml-12 max-w-[60%]'>
                    <Label className="text-6xl font-bold text-white">¡Bienvenido a Squad!</Label>
                    <Label className="text-2xl font-normal text-white opacity-85">Con Squad, forma y descubre grupos de estudio de manera fácil y rápida. Conéctate con compañeros, colabora y maximiza tu aprendizaje.</Label>
                </div>

            </div>

            <div className="flex flex-col min-h-[90vh] items-center justify-center md:px-32">

                <div className="flex flex-row items-center space-x-2 mb-4">
                    <img src={squad_icon_256} className="h-16" alt="SQUAD" />
                    <img src={squad_logo_white} className="hidden dark:flex h-16" alt="SQUAD" />
                    <img src={squad_logo_black} className="dark:hidden h-16" alt="SQUAD" />
                </div>

                <Card className="mx-auto w-[90%] md:w-[370px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Iniciar sesion</CardTitle>
                        {/* <CardDescription>
                            Enter your email and password to login to your account.
                        </CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
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
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel htmlFor="password" className="inline-flex items-center gap-1">
                                                        <Lock size={14} />
                                                        Contraseña
                                                    </FormLabel>
                                                    <Link
                                                        to='/forgot'
                                                        className="ml-auto inline-block text-sm underline opacity-50"
                                                    >
                                                        Olvide mi contraseña
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <PasswordInput
                                                        id="password"
                                                        placeholder="******"
                                                        autoComplete="current-password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {error && <Label className="text-red-500">{error}</Label>}
                                    <Button type="submit" className="w-full">
                                        <LogIn />
                                        Iniciar sesion
                                    </Button>
                                    <Button type="button" variant="outline" className="w-full" onClick={signInGoogle}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        </svg>
                                        Continuar con Google
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            ¿No tienes cuenta?{' '}
                            <Link to='/register' className="underline">
                                Registrate
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>


        </div>

    )
}