'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', stock: '' });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
    });
    setForm({ name: '', price: '', description: '', category: '', stock: '' });
    await fetchProducts();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    await fetchProducts();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Ecommerce Store</h1>

      {/* Add Product Form */}
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          {['name', 'price', 'description', 'category', 'stock'].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="border rounded-lg p-2 col-span-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Products ({products.length})</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No products yet. Add one above!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{p.category}</span>
                  <h3 className="text-xl font-bold mt-2 text-gray-800">{p.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">${p.price}</p>
                    <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}