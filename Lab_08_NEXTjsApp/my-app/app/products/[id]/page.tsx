import { products } from "@/data/products";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h1 className="text-2xl font-semibold text-red-600">Product not found</h1>;
  }

  return (
    <div className="border p-6 rounded shadow max-w-md">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="text-green-600 text-xl font-semibold mt-2">
        ${product.price}
      </p>
    </div>
  );
}