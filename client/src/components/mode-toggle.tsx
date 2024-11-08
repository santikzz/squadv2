import { Moon, Smartphone, Sun } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex outline-none border-none">
                    <Sun size={24} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon size={24} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-lg" onClick={() => setTheme("light")}>
                    <Sun />
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg" onClick={() => setTheme("dark")}>
                    <Moon />
                    Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg" onClick={() => setTheme("system")}>
                    <Smartphone />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
