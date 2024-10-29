import { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Navigate, useNavigate } from 'react-router-dom'
// import { Icons } from "@/components/ui/icons"
import { AuthContext } from '@/context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    const { isAuthenticated } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleSubmit = () => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempted with:', email, password)
    }

    if (isAuthenticated) return <Navigate to="/" replace />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        {/* Replace with your actual logo */}
                        {/* <Icons.logo className="h-12 w-12 text-primary" /> */}
                    </div>
                    <h2 className="text-2xl font-bold">Login to Your Account</h2>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Login</Button>
                        <a href='http://localhost:3000/auth/google'>Sign in with Google</a>
                        <p className="text-sm text-center text-gray-600">
                            Don't have an account?{' '}
                            <a href="/register" className="text-primary hover:underline">
                                Register here
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}