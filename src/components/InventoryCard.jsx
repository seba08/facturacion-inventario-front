import { useEffect, useRef } from 'react';

export default function InventoryCard({ products }) {
  const canvasRef = useRef(null);
    //console.log(products)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Calcular cantidades
    const totalProducts = products.length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const healthyStock = products.filter(p => p.stock > 5).length;

    // Datos y colores
    const data = [outOfStock, lowStock, healthyStock];
    const colors = ['#EF4444', '#FACC15', '#22C55E'];
    const total = data.reduce((sum, value) => sum + value, 0);

    // Dibujar gráfico
    let startAngle = 0;
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(150, 150); // Centro del círculo
      ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = colors[index];
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Leyendas (opcional)
    const legendData = ['Agotados', 'Stock Bajo', 'Stock Sano'];
    legendData.forEach((label, index) => {
      ctx.fillStyle = colors[index];
      ctx.fillRect(20, 320 + index * 20, 15, 15); // Cuadro de color
      ctx.fillStyle = '#000';
      ctx.fillText(label, 45, 330 + index * 20); // Texto
    });
  }, [products]);

  return (
    <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center">
      {/* Encabezado */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Inventario de Productos
      </h2>

      {/* Canvas para el gráfico */}
      <canvas ref={canvasRef} width={300} height={400} className="mb-4"></canvas>

      {/* Resumen */}
      <div className="text-center">
        <p className="text-gray-600">
          Total de productos: <span className="font-bold">{products.length}</span>
        </p>
        <p className="text-red-500">
          Agotados: <span className="font-bold">{products.filter(p => p.stock === 0).length}</span>
        </p>
        <p className="text-yellow-500">
          Stock bajo: <span className="font-bold">{products.filter(p => p.stock > 0 && p.stock <= 5).length}</span>
        </p>
        <p className="text-green-500">
          Stock sano: <span className="font-bold">{products.filter(p => p.stock > 5).length}</span>
        </p>
      </div>
    </div>
  );
}
