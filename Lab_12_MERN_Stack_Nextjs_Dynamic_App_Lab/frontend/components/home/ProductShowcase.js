'use client';
import Link    from 'next/link';
import { useCart } from '@/lib/CartContext';

function ProductRow({ product }) {
  const { addItem } = useCart();
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <Link href={`/product/${product._id}`} className="flex-shrink-0 w-20 h-16 overflow-hidden rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product._id}`}>
          <p className="text-xs text-gray-500 leading-snug line-clamp-2 hover:text-gray-800">{product.name}</p>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          {product.oldPrice && (
            <span className="text-gray-400 text-xs line-through">£{product.oldPrice}</span>
          )}
          <span className="text-[#F16E10] text-sm font-bold">£{product.price}</span>
        </div>
        <button
          onClick={() => addItem(product._id)}
          className="mt-1 text-xs border border-gray-300 px-3 py-0.5 rounded hover:border-[#F16E10] hover:text-[#F16E10] transition-colors"
        >
          Detail
        </button>
      </div>
    </div>
  );
}

function ProductColumn({ title, products, tag }) {
  return (
    <div className="bg-white border border-gray-200 rounded p-4 flex flex-col">
      <h3 className="font-serif text-base font-bold text-gray-700 tracking-widest uppercase mb-3 text-center border-b border-gray-100 pb-2">
        {title}
      </h3>
      <div className="flex-1">
        {products.length === 0
          ? [1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100">
                <div className="w-20 h-16 bg-gray-100 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))
          : products.slice(0, 4).map(p => <ProductRow key={p._id} product={p} />)
        }
      </div>
      <Link
        href={`/shop?tag=${tag}`}
        className="mt-4 block text-center text-xs text-gray-500 border border-gray-200 rounded-full py-2 hover:border-[#F16E10] hover:text-[#F16E10] transition-colors"
      >
        See All {title}
      </Link>
    </div>
  );
}

export default function ProductShowcase({ featured = [], special = [], popular = [] }) {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        <ProductColumn title="Featured" products={featured} tag="featured" />
        <ProductColumn title="Special"  products={special}  tag="special" />
        <ProductColumn title="Popular"  products={popular}  tag="popular" />
      </div>
    </section>
  );
}
