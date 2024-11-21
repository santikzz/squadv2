import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useMemo, useState, forwardRef } from "react";

const PasswordInputStrength = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {

    // const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{6,}/, text: "Al menos 6 caracteres" },
            { regex: /[A-Z]/, text: "Al menos una mayuscula" },
            { regex: /[\W_]/, text: "Al menos un simbolo" },
        ];

        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    // const strength = checkStrength(password);
    const strength = useMemo(() => checkStrength(props.value || ""), [props.value]);

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border";
        if (score <= 1) return "bg-red-500";
        if (score <= 2) return "bg-orange-500";
        if (score === 3) return "bg-green-500";
        return "bg-emerald-500";
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return "Ingrese una contraseña";
        if (score <= 2) return "Contraseña debil";
        if (score === 3) return "Contraseña media";
        return "Contraseña fuerte";
    };

    return (
        <div>
            {/* Password input field with toggle visibility button */}
            <div className="space-y-2">
                <Label htmlFor="input-51">Input with password strength indicator</Label>
                <div className="relative">
                    <Input
                        className="pe-9"
                        type={isVisible ? "text" : "password"}
                        ref={ref}
                        {...props}
                        // onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={strengthScore < 4}
                        aria-describedby="password-strength"
                    />
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        aria-controls="password"
                    >
                        {isVisible ? (
                            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Password strength indicator */}
            <div
                className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={2}
                aria-label="Password strength"
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 3) * 100}%` }}
                ></div>
            </div>

            {/* Password strength description */}
            <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
                {getStrengthText(strengthScore)}. Debe contener:
            </p>

            {/* Password requirements list */}
            <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                            <Check size={16} className="text-emerald-500" aria-hidden="true" />
                        ) : (
                            <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                        )}
                        <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                            {req.text}
                            <span className="sr-only">
                                {req.met ? " - Requirement met" : " - Requirement not met"}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
);

export default PasswordInputStrength;