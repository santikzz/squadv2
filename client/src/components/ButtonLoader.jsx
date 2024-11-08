import { Button } from "@/components/ui/button";
import { ring } from 'ldrs'

ring.register()

export default function ButtonLoader({ children, isLoading = false, loadingText = '', disabled, onClick = () => { }, className, ...props }) {
    return (
        <Button
            className={`active:brightness-75 transition-all duration-100 ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <l-ring size="20" stroke="2.5" bg-opacity="0" speed="2" color="white"></l-ring>
                    {loadingText}
                </>
            ) : (children)}
        </Button>
    );
}