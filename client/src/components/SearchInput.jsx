import { Search, X } from "lucide-react"
export default function SearchInput({ value, setValue, ref = null, cancel = null }) {

    const clear = () => {
        setValue('');
        if (cancel !== null) cancel();
    }

    return (
        <div className="flex flex-row items-center space-x-2 bg-neutral-200 dark:bg-neutral-900 p-2 rounded-full flex-1">
            <Search size={24} className="text-neutral-400 dark:text-neutral-500" />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={ref}
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-none outline-none flex-1 md:w-80 text-black dark:text-white"
            />
            <button className="md:hidden" onClick={clear}><X size={24} className="text-neutral-400 dark:text-neutral-500 pr-2" /></button>
        </div>
    );
};