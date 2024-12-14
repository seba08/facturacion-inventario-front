'use client'
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const AddProductPage = () => {
  const router = useRouter();
  const handleAddProduct = (newProduct) => {
    console.log("Nuevo Producto:", newProduct);
    // Aquí enviarías el producto a tu API, ejemplo:
    
    fetch("http://localhost:5500/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token")
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Producto agregado:", data)
        router.push("/dashboard/products")

      })
      .catch((err) => console.error("Error al agregar producto:", err));
   
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
