'use client'
import React, { useEffect, useState } from "react";

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!product.name || !product.price || !product.stock || !product.category) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (isNaN(product.price) || isNaN(product.stock)) {
      setError("El precio y el stock deben ser números.");
      return;
    }

    setError("");
    //console.log("HandleSubmit")
    onSubmit(product); // Llama al manejador de envío proporcionado
  };

  
  useEffect(() => {
    const fetchCategories = () => {
      try {
        fetch("http://localhost:5500/categories")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
          const { categories } = res;
          setCategoryList(categories)
        })
        .catch(err => {
          console.error(err)
        })
        
      } catch (error) {
        throw new Error(`Error: ${error}`)
      }
    }
    fetchCategories();
  }, [])
  //console.log("Lista de categoría: ", categoryList)
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Nombre del producto */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.name}
            onChange={handleChange}
            placeholder="Ej. Laptop Dell"
          />
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 mb-2">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.price}
            onChange={handleChange}
            placeholder="Ej. 1200.00"
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.stock}
            onChange={handleChange}
            placeholder="Ej. 10"
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-2">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {
              categoryList.map(category => (
                <option value={category._id} key={category._id}>{category.name}</option>
              ))
            }
            {/* <option value="Tecnología">Tecnología</option>
            <option value="Hogar">Hogar</option>
            <option value="Deportes">Deportes</option> */}
          </select>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
