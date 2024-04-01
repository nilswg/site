import { Counter } from '@nilswg-site/ui/Counter';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="p-4 text-center text-[100px] text-slate-100">Next</h1>
            <Counter />
        </main>
    );
}
