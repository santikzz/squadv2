import { useState } from "react"
import { Menu, Search, Home, Users, Settings, HelpCircle, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ModeToggle } from "@/components/mode-toggle"


export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { icon: Home, label: "Home" },
        { icon: Users, label: "Friends" },
        { icon: Settings, label: "Settings" },
        { icon: HelpCircle, label: "Help" },
        { icon: LogOut, label: "Logout" },
    ]

    const LeftSheet = () => (
        <div className="flex h-full flex-col justify-between p-4">
            <nav className="space-y-4">
                {navItems.map((item, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </Button>
                ))}
            </nav>
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                </div>
            </div>
        </div>
    )

    return (
        <div className="flex h-screen flex-col">
            {/* Top Navbar */}
            <header className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                            <LeftSheet />
                        </SheetContent>
                    </Sheet>
                    <h1 className="text-xl font-bold">Logo</h1>
                </div>
                <div className="flex w-full max-w-sm items-center space-x-2">

                    <ModeToggle />

                    <Input type="search" placeholder="Search..." className="w-full" />
                    <Button type="submit" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sheet (visible on larger screens) */}
                <aside className="hidden w-64 flex-shrink-0 border-r md:block">
                    <LeftSheet />
                </aside>

                {/* Center Feed */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="mx-auto max-w-2xl space-y-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="rounded-lg border p-4 shadow">
                                <h2 className="mb-2 text-lg font-semibold">Card Title {i + 1}</h2>
                                <p className="text-gray-600">
                                    This is some placeholder content for card number {i + 1}. You can replace this with actual content from your feed.
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}