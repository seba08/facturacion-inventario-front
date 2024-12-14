
import Header from "@/components/Header";
import Link from "next/link";


export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Bienvenido al Sistema</h2>
          <p className="text-gray-600 mb-6">
            Inicia sesión o regístrate para gestionar tus productos y facturación.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded">
                Login
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 text-white text-center">
        &copy; 2024 Facturación e Inventario. Todos los derechos reservados.
      </footer>
    </div>
  );
}
