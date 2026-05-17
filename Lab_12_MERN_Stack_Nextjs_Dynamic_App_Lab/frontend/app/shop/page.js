'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams }               from 'next/navigation';
import { getProducts, getCategories }    from '@/lib/api';
import { useCart }                       from '@/lib/CartContext';
import Link                              from 'next/link';
import { ShoppingCart, ChevronLeft }     from 'lucide-react';

function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/product/${product._id}`}>
        <div className="h-52 overflow-hidden">
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-medium text-gray-800 text-sm hover:text-[#F16E10] transition-colors mb-1 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          {product.oldPrice && <span className="text-gray-400 text-xs line-through">£{product.oldPrice}</span>}
          <span className="text-[#F16E10] font-bold">£{product.price}</span>
        </div>
        <button onClick={() => addItem(product._id)}
          className="w-full flex items-center justify-center gap-2 text-xs border border-gray-300 py-1.5 rounded hover:border-[#F16E10] hover:text-[#F16E10] transition-colors">
          <ShoppingCart size={12} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

function ShopContent() {
  const searchParams            = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [catMap, setCatMap]     = useState({});

  const categorySlug = searchParams.get('category') || '';
  const tag          = searchParams.get('tag')      || '';
  const search       = searchParams.get('search')   || '';

  useEffect(() => {
    getCategories().then(res => {
      setCategories(res.data.categories);
      const map = {};
      res.data.categories.forEach(c => { map[c.slug] = c._id; });
      setCatMap(map);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (categorySlug && catMap[categorySlug]) params.category = catMap[categorySlug];
    if (tag)    params.tag    = tag;
    if (search) params.search = search;

    getProducts(params)
      .then(res => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [categorySlug, tag, search, catMap]);

  const pageTitle = search
    ? `Search: "${search}"`
    : categorySlug
    ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Collection`
    : tag
    ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} Products`
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#F16E10] flex items-center gap-1"><ChevronLeft size={14} />Home</Link>
        <span>/</span>
        <span className="text-gray-800">{pageTitle}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop"
                  className={`text-sm block py-1 hover:text-[#F16E10] transition-colors ${!categorySlug ? 'text-[#F16E10] font-semibold' : 'text-gray-600'}`}>
                  All Products
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat._id}>
                  <Link href={`/shop?category=${cat.slug}`}
                    className={`text-sm block py-1 hover:text-[#F16E10] transition-colors ${categorySlug === cat.slug ? 'text-[#F16E10] font-semibold' : 'text-gray-600'}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 mt-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3 uppercase tracking-wider">Filter by Tag</h3>
            <ul className="space-y-2">
              {['featured', 'special', 'popular'].map(t => (
                <li key={t}>
                  <Link href={`/shop?tag=${t}`}
                    className={`text-sm block py-1 hover:text-[#F16E10] transition-colors capitalize ${tag === t ? 'text-[#F16E10] font-semibold' : 'text-gray-600'}`}>
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-serif text-xl text-gray-800">{pageTitle}</h1>
            <span className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">No products found</p>
              <Link href="/shop" className="btn-orange inline-block">View All Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-gray-400 animate-pulse">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
