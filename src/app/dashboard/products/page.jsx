'use client'
import ProductTable from '@/components/ProductTable';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Products(){
  //const [products, setProducts] = useState({})
  const router = useRouter();

    const fetchProducts = async (cursor, limit) => {
      try {
        const response = await fetch(
          `http://localhost:5500/products/paginated?cursor=${cursor || ""}&limit=${limit || 10}&direction=forward`, {
            headers:{
              "x-token": localStorage.getItem("token")
            }
          }
        );
        const data = await response.json();
        if(response.status === 401){
          router.push("/login")
          localStorage.removeItem("token")
        }
        //console.log(data)
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], currentPage: null, nextPage: null, previousPage: null };
      }
    };
    fetchProducts();

  
       
  
  return (
    <>
        <div>ProductsPage</div>
        <ProductTable fetchProducts={fetchProducts}/>
    </>
  )
}
