'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem } from './api';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

function getSessionId() {
  if (typeof window === 'undefined') return null;
  let sid = localStorage.getItem('rustik_session');
  if (!sid) {
    sid = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('rustik_session', sid);
  }
  return sid;
}

export function CartProvider({ children }) {
  const [cart, setCart]       = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    const sid = getSessionId();
    if (!sid) return;
    try {
      const res = await getCart(sid);
      setCart(res.data.cart);
    } catch {}
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = async (productId, quantity = 1) => {
    const sid = getSessionId();
    setLoading(true);
    try {
      const res = await addToCart(sid, { productId, quantity });
      setCart(res.data.cart);
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (productId, quantity) => {
    const sid = getSessionId();
    try {
      const res = await updateCartItem(sid, productId, { quantity });
      setCart(res.data.cart);
    } catch {
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (productId) => {
    const sid = getSessionId();
    try {
      const res = await removeCartItem(sid, productId);
      setCart(res.data.cart);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const totalItems = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const totalPrice = cart.items?.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, totalItems, totalPrice, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};