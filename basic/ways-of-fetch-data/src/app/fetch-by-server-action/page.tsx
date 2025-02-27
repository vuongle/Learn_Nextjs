/* eslint-disable @typescript-eslint/no-explicit-any */
//
// use a server action to fecth data in server component
//

import { getProducts } from "@/app/fetch-by-server-action/actions";

export default async function Home() {
  const data = await getProducts();
  console.log(data.produchts);
  return (
    <div className="grid grid-rowsitems-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Use server action to Fetch data in server component</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.products.map((product: any) => (
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
}
