import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

export default function NotificationSimple() {
    return (
        <div className="group flex flex-row space-x-4 p-2">
            <UserPlus size={48} className="text-blue-500" />
            <div className="ml-11 flex flex-col space-y-2">
                <Label className="font-normal text-base"><Link className="font-semibold hover:underline">Julian Alvarez Lopez Julian</Link> se ha unido a tu grupo <Link className="font-semibold hover:underline">'Grupo de estudio para prog3 parcial y otros temas aleatorios'</Link></Label>
                <Label className="opacity-75 font-normal text-xs">Hace 12 horas</Label>
            </div>
        </div>
    );
}