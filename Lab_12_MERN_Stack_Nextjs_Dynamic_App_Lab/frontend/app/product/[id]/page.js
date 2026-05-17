'use client';
import { useEffect, useState } from 'react';
import { useParams }           from 'next/navigation';
import { getProduct, addReview } from '@/lib/api';
import { useCart }             from '@/lib/CartContext';
import { ShoppingCart, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id }          = useParams();
  const { addItem }     = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty]         = useState(1);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState('');
  const [review, setReview]   = useState({ user: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id)
      .then(res => {
        setProduct(res.data.product);
        setMainImg(res.data.product.image);
      })
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => addItem(id, qty);

  const handleReview = async (e) => {
    e.preventDefault();
    if (!review.user || !review.comment) return toast.error('Please fill all fields');
    setSubmitting(true);
    try {
      const res = await addReview(id, review);
      setProduct(res.data.product);
      setReview({ user: '', rating: 5, comment: '' });
      toast.success('Review submitted!');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
      <div className="text-gray-400 text-lg animate-pulse">Loading product...</div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <p className="text-gray-500">Product not found.</p>
      <Link href="/" className="text-[#F16E10] underline mt-4 inline-block">Back to Home</Link>
    </div>
  );

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#F16E10] flex items-center gap-1"><ChevronLeft size={14} /> Home</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category?.slug}`} className="hover:text-[#F16E10]">{product.category?.name}</Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
        {/* Images */}
        <div>
          <div className="border border-gray-200 rounded overflow-hidden h-80 md:h-96 mb-3">
            <img src={mainImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setMainImg(img)}
                  className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden transition-colors ${mainImg === img ? 'border-[#F16E10]' : 'border-gray-200'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-gray-800 mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">£{product.oldPrice}</span>
            )}
            <span className="text-[#F16E10] text-3xl font-bold">£{product.price}</span>
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={16}
                className={s <= Math.round(product.rating) ? 'text-[#F16E10] fill-[#F16E10]' : 'text-gray-300'} />
            ))}
            <span className="text-gray-500 text-sm ml-2">({product.reviews?.length || 0} reviews)</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 text-gray-600 font-bold">−</button>
              <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="px-3 py-2 hover:bg-gray-100 text-gray-600 font-bold">+</button>
            </div>
            <button onClick={handleAddToCart}
              className="flex items-center gap-2 bg-[#F16E10] text-white px-6 py-2.5 rounded-full hover:bg-[#c45608] transition-colors text-sm font-medium">
              <ShoppingCart size={16} />
              ADD TO CART
            </button>
          </div>

          <div className="text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-4">
            <p><span className="font-semibold text-gray-700">Category:</span> {product.category?.name}</p>
            <p><span className="font-semibold text-gray-700">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
            <p><span className="font-semibold text-gray-700">Tag:</span> {product.tag}</p>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="font-serif text-xl text-gray-800 mb-6">Customer Reviews</h2>
        {product.reviews?.length === 0 ? (
          <p className="text-gray-400 text-sm mb-6">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4 mb-8">
            {product.reviews?.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-gray-800">{r.user}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12}
                        className={s <= r.rating ? 'text-[#F16E10] fill-[#F16E10]' : 'text-gray-200'} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add review form */}
        <div className="bg-gray-50 rounded p-6 max-w-lg">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Leave a Review</h3>
          <form onSubmit={handleReview} className="space-y-3">
            <input
              value={review.user}
              onChange={e => setReview({ ...review, user: e.target.value })}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#F16E10]"
            />
            <select
              value={review.rating}
              onChange={e => setReview({ ...review, rating: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#F16E10]"
            >
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
            </select>
            <textarea
              value={review.comment}
              onChange={e => setReview({ ...review, comment: e.target.value })}
              placeholder="Your review..."
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#F16E10] resize-none"
            />
            <button type="submit" disabled={submitting}
              className="btn-orange disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
