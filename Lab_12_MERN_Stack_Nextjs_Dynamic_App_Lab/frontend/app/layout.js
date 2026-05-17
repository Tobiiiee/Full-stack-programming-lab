import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import { Toaster }      from 'react-hot-toast';
import Navbar           from '@/components/layout/Navbar';
import Footer           from '@/components/layout/Footer';

export const metadata = {
  title: 'Rustik Plank | Handcrafted Wooden Furniture',
  description: 'High-end rustic, reclaimed and hand-crafted wooden furniture.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
