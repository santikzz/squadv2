import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, UserPlus, X } from "lucide-react";

export default function NotificationJoinRequest() {
    return (
        <div className="group flex flex-row space-x-4 p-2 hovers:bg-neutral-900 rounded-md">
            <UserPlus size={48} className="text-blue-500" />
            <div className="flex flex-col space-y-2">
                <Label className="font-normal text-base"><Link className="font-semibold hover:underline">Julian Alvarez Lopez Julian</Link> ha solicitado unirse a tu grupo <Link className="font-semibold hover:underline">"Grupo de estudio para prog3 parcial y otros temas aleatorios"</Link></Label>
                <Label className="opacity-75 font-normal text-xs">Hace 12 horas</Label>
                <div className="flex flex-row justify-between gap-4">
                    <Button variant="outline" className="flex-1 border-red-500 opacity-60 hover:opacity-100 transition-opacity duration-100"><X />Rechazar</Button>
                    <Button variant="outline" className="flex-1 border-green-500 opacity-60 hover:opacity-100 transition-opacity duration-100"><Check /> Aceptar</Button>
                </div>
            </div>
        </div>
    )
}