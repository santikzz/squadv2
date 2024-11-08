import { SendHorizonal } from "lucide-react";

export default function ChatInput({ value, onChange }) {

    return (
        <div className="min-h-12 rounded-full flex-1 flex flex-row items-center justify-between border-2 px-4">
            <input
                value={value}
                onChange={onChange}

                placeholder="Escribe algo..."
                className="bg-transparent outline-none border-0 text-base flex-1"
            />

            <button
                className="pr-1 opacity-75"
                type="submit"
            >
                <SendHorizonal size={24} />
            </button>
        </div>
    );
}