"use client";

import { removeProduct } from "@/actions/products";
import { getProducts } from "@/prisma-db";
import { useOptimistic } from "react";
import Link from "next/link";
import Form from "next/form";
// This component is used to display product details and handle product removal

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export const ProductDetail = ({ products }: { products: Product[] }) => {
  // Ensure products are initialized with a description
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (currentProducts, productId) => {
      return currentProducts.filter((product) => product.id !== productId);
    }
  );

  const removeProductById = async (productId: number) => {
    setOptimisticProducts(productId);
    // Optimistically update the UI by removing the product
    await removeProduct(productId);
  };

  return (
    <ul className="space-y-4 p-4">
      {optimisticProducts.map((product) => (
        <li
          key={product.id}
          className="p-4 bg-white border rounded-lg shadow-md text-gray-700"
        >
          <h2 className="text-xl font-semibold">
            <Link href={`/products-db/${product.id}`}>{product.title}</Link>
          </h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-medium">${product.price}</p>
          <Form action={removeProductById.bind(null, product.id)}>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </Form>
        </li>
      ))}
    </ul>
  );
};
