'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const menuItems = [
    { name: "Productos", href: "/dashboard/products", icon: "📦" },
    { name: "Facturas", href: "/dashboard/invoices", icon: "🧾" },
    { name: "Usuarios", href: "/dashboard/users", icon: "👤" },
  ];

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    const logOut = confirm("Estas seguro que quieres salir?");
    if(logOut) router.push("/login");
}

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-semibold border-b border-blue-500">
          Dashboard
        </div>
        <nav className="flex-grow">
          <ul className="mt-4">
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.href} className={`flex items-center px-4 py-2 text-lg rounded ${
                      router.pathname === item.href
                        ? "bg-blue-500"
                        : "hover:bg-blue-500"
                    }`}>
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-blue-500">
          <button
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>
        <div className="flex-grow p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
