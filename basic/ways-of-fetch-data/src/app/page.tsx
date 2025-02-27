/* eslint-disable @typescript-eslint/no-explicit-any */
//
// fetching data in server component
// this example puts the a function fetching data in the server component
// there are a few other ways to put the function:
// 1. put the function in a separate action file (server action)
// 2. put the function in a route handler
//

const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function Home() {
  const data = await getProducts();

  return (
    <div className="grid grid-rows items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Fetch data in server component</h1>
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
