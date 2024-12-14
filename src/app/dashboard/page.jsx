'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InventoryCard from '@/components/InventoryCard';
export default function Dashboard() {
    const [user, setUser] = useState("");
    const [products, setProducts ] = useState([]);
    const router = useRouter();
    useEffect(() => {
        // Fetch products from API
        const dashBoardAccess = async () => {
          const response = await fetch('http://localhost:5500/dashboard',{
            headers: {
                "x-token": localStorage.getItem("token")
            }
          });
          if(response.ok){
            const data = await response.json();
            const { result } = data;
            setUser(result.user)
            setProducts(...products, result.products)
        }else{
            router.push("/login")
            localStorage.removeItem("token")
        }
        
    };
    dashBoardAccess();
    }, []);



  return (
    <div className="h-screen flex">

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span className="text-gray-700">Hola, <span className="font-semibold">{user}</span></span>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h2>
        <p className="text-gray-600">Selecciona una opción en el menú lateral para comenzar.</p>
        <div id="productos">
          {/* Aquí puedes agregar la lógica de los productos */}
          <h3 className="text-xl font-bold mt-6">Productos</h3>
          <p className="text-gray-500">Gestión de productos en desarrollo.</p>
        </div>
        <InventoryCard products={products}/>
      </main>
    </div>
  </div>
  );
}
