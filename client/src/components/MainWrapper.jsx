import LeftSheet from "@/components/LeftSheet";
import Header from "@/components/Header"

export default function MainWrapper({ children }) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden w-64 flex-shrink-0 border-r md:block">
                    <LeftSheet />
                </aside>
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}