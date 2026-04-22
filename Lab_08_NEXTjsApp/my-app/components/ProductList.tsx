import Link from "next/link";
import { products } from "@/data/products";

export default function ProductList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{p.title}</h2>
          <p>{p.description}</p>
          <p className="text-green-600 font-semibold">${p.price}</p>
          <Link href={`/products/${p.id}`}
            className="text-blue-500 underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}