import Link from 'next/link';


export default function Header(){

    return(
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Facturación</h1>
        <div className="space-x-4">
        <Link href="/login">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            Login
            </button>
        </Link>
        </div>
    </header>
    )
}