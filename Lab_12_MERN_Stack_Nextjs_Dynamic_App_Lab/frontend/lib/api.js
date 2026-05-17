import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

export const getProducts       = (params)      => api.get('/products', { params });
export const getProduct        = (id)          => api.get(`/products/${id}`);
export const addReview         = (id, data)    => api.post(`/products/${id}/reviews`, data);

export const getCategories     = ()            => api.get('/categories');
export const getCategoryBySlug = (slug)        => api.get(`/categories/${slug}`);

export const getCart           = (sid)         => api.get(`/cart/${sid}`);
export const addToCart         = (sid, data)   => api.post(`/cart/${sid}/items`, data);
export const updateCartItem    = (sid, pid, data) => api.put(`/cart/${sid}/items/${pid}`, data);
export const removeCartItem    = (sid, pid)    => api.delete(`/cart/${sid}/items/${pid}`);
export const clearCart         = (sid)         => api.delete(`/cart/${sid}`);

export const createOrder       = (data)        => api.post('/orders', data);
export const getOrders         = (sid)         => api.get(`/orders/${sid}`);

export const getBlogs          = ()            => api.get('/blogs');
export const getBlog           = (slug)        => api.get(`/blogs/${slug}`);

export const getDeals          = ()            => api.get('/deals');

export default api;