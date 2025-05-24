import { getProducts } from "@/prisma-db";
import { ProductDetail } from "./product-detail";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export default async function ProductsDBPage() {
  const products: Product[] = await getProducts();
  return <ProductDetail products={products} />;
}
