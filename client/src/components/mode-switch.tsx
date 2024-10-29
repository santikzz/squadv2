import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export function ModeSwitch() {

    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

    useEffect(() => {
        setTheme(isDarkMode ? "dark" : "light");
    }, [isDarkMode, setTheme]);

    useEffect(() => {
        setIsDarkMode(theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <Switch
            className="scale-150"
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
        />
    )
}
