/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

//
// fetching data by calling a route handler (internal api of next server)
//

import { useEffect, useState } from "react";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3001/api/products", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="grid grid-rows items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="font-bold text-lg text-blue-400">
        Fetch data in a route handler
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <li
            key={product.id}
            className="bg-white rounded-lg shadow-lg border border-gray-100 p-4"
          >
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2">{product.category}</p>
            <p className="mt-2 font-bold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
