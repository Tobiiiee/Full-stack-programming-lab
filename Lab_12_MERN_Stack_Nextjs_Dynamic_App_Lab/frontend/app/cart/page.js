'use client';
import { useCart }  from '@/lib/CartContext';
import { createOrder } from '@/lib/api';
import { Trash2, ShoppingCart, ChevronLeft } from 'lucide-react';
import Link          from 'next/link';
import { useState }  from 'react';
import toast         from 'react-hot-toast';

export default function CartPage() {
  const { cart, totalItems, totalPrice, updateItem, removeItem } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [placing, setPlacing]     = useState(false);
  const [form, setForm] = useState({
    fullName: '', address: '', city: '', postcode: '', country: 'UK', paymentMethod: 'cod',
  });

  const sessionId = typeof window !== 'undefined' ? localStorage.getItem('rustik_session') : '';

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.address || !form.city || !form.postcode) {
      return toast.error('Please fill all fields');
    }
    setPlacing(true);
    try {
      await createOrder({
        sessionId,
        shippingAddress: { fullName: form.fullName, address: form.address, city: form.city, postcode: form.postcode, country: form.country },
        paymentMethod: form.paymentMethod,
      });
      setOrderDone(true);
      toast.success('Order placed successfully!');
    } catch {
      toast.error('Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (orderDone) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="font-serif text-3xl text-gray-800 mb-3">Order Placed!</h2>
      <p className="text-gray-500 mb-6">Thank you for shopping with Rustik Plank. Your order is being processed.</p>
      <Link href="/" className="btn-orange inline-block">Continue Shopping</Link>
    </div>
  );

  if (totalItems === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <ShoppingCart size={64} className="mx-auto text-gray-200 mb-4" />
      <h2 className="font-serif text-2xl text-gray-700 mb-3">Your cart is empty</h2>
      <p className="text-gray-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
      <Link href="/" className="btn-orange inline-block">Start Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#F16E10] flex items-center gap-1"><ChevronLeft size={14} /> Home</Link>
        <span>/</span>
        <span className="text-gray-800">Shopping Cart</span>
      </div>

      <h1 className="font-serif text-2xl text-gray-800 mb-8">Shopping Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items?.map(item => (
            <div key={item.product?._id} className="flex items-center gap-4 border border-gray-200 rounded p-4">
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded border border-gray-100">
                <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product?._id}`}>
                  <h3 className="font-medium text-gray-800 text-sm hover:text-[#F16E10] transition-colors line-clamp-2">{item.product?.name}</h3>
                </Link>
                <p className="text-[#F16E10] font-bold mt-1">£{item.product?.price}</p>
              </div>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button onClick={() => updateItem(item.product?._id, item.quantity - 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 text-sm font-bold">−</button>
                <span className="px-3 py-1.5 text-sm border-x border-gray-300">{item.quantity}</span>
                <button onClick={() => updateItem(item.product?._id, item.quantity + 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 text-sm font-bold">+</button>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-sm">£{(item.product?.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.product?._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors mt-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary / Checkout */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-5">
            <h2 className="font-serif text-lg text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-green-600">Free</span></div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
                <span>Total</span><span className="text-[#F16E10]">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            {!checkout && (
              <button onClick={() => setCheckout(true)}
                className="w-full mt-5 btn-orange text-center">
                Proceed to Checkout
              </button>
            )}
          </div>

          {/* Checkout form */}
          {checkout && (
            <div className="border border-gray-200 rounded p-5">
              <h2 className="font-serif text-lg text-gray-800 mb-4">Shipping Details</h2>
              <form onSubmit={handleOrder} className="space-y-3">
                {[
                  { key: 'fullName', label: 'Full Name', type: 'text' },
                  { key: 'address',  label: 'Address',   type: 'text' },
                  { key: 'city',     label: 'City',      type: 'text' },
                  { key: 'postcode', label: 'Postcode',  type: 'text' },
                  { key: 'country',  label: 'Country',   type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#F16E10]"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Payment Method</label>
                  <select
                    value={form.paymentMethod}
                    onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#F16E10]"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                  </select>
                </div>
                <button type="submit" disabled={placing}
                  className="w-full btn-orange disabled:opacity-60">
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
                <button type="button" onClick={() => setCheckout(false)}
                  className="w-full text-xs text-gray-400 hover:text-gray-600">
                  ← Back to Cart
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
