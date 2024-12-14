'use client'
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProductTable = ({fetchProducts}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [pageSize, setPageSize] = useState(2);
  const router = useRouter()

  // Fetch products on component mount or page change
  useEffect(() => {
      const loadProducts = async () => {
      const response = await fetchProducts(currentPage, pageSize);
      setProducts(response.products)
      console.log(response)
      setCurrentPage(response.currentPage);
      setNextPage(response.nextPage);
      setPreviousPage(response.previousPage);
    };
    loadProducts();
  }, [currentPage, pageSize, fetchProducts]);

  const handleNew = (e) => {
    router.push("/dashboard/products/new")
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Productos</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={handleNew} // Aquí manejarías la creación
        >
          <FaPlus />
          Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Nombre</th>
              <th className="text-left px-4 py-2 border">Stock</th>
              <th className="text-left px-4 py-2 border">Precio</th>
              <th className="text-left px-4 py-2 border">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">
                  {product.stock > 0 ? product.stock : "Agotado"}
                </td>
                <td className="px-4 py-2 border">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          disabled={!previousPage}
          onClick={() => setCurrentPage(previousPage)}
        >
          Anterior
        </button>
        <span className="text-gray-600">Página actual: {currentPage || "Inicio"}</span>
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          disabled={!nextPage}
          onClick={() => setCurrentPage(nextPage)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
