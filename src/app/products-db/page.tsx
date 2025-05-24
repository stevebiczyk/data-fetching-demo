import { removeProduct } from "@/actions/products";
import { getProducts } from "@/prisma-db";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export default async function ProductsDBPage() {
  const products: Product[] = (await getProducts()).map((product) => ({
    ...product,
    description: product.description ?? "",
  }));
  return (
    <ul className="space-y-4 p-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="p-4 bg-white border rounded-lg shadow-md text-gray-700"
        >
          <h2 className="text-xl font-semibold">
            <Link href={`/products-db/${product.id}`}>{product.title}</Link>
          </h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-medium">${product.price}</p>
          <form action={removeProduct.bind(null, product.id)} method="POST">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
