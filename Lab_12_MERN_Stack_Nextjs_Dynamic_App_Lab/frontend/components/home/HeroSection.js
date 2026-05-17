'use client';
import Image from 'next/image';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

const HERO_SLIDES = [
  {
    id:    1,
    title: "Curved Slatted Lounge Chair",
    desc:  "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.",
    price: "£129.99",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600",
  },
  {
    id:    2,
    title: "Reclaimed Oak Dining Table",
    desc:  "Hand-crafted from reclaimed oak with a natural finish. This statement piece brings warmth and character to any dining room.",
    price: "£249.99",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const { addItem }           = useCart();
  const slide = HERO_SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-white min-h-[360px] md:min-h-[440px]">
      {/* Decorative orange wave SVG */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '120px' }}>
        <path d="M0,60 C300,120 600,0 900,60 C1100,100 1300,20 1440,60 L1440,120 L0,120 Z" fill="none" stroke="#F16E10" strokeWidth="3" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Hero image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <img
              src={slide.image}
              alt={slide.title}
              className="object-contain w-full h-full drop-shadow-xl rounded"
            />
          </div>
        </div>

        {/* Hero copy */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Orange triangle pointer */}
          <div className="flex justify-center md:justify-start mb-3">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#F16E10]" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-gray-800 mb-3">{slide.title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-sm">{slide.desc}</p>
          <div className="flex items-end gap-2 justify-center md:justify-start mb-5">
            <span className="text-[#F16E10] font-bold text-4xl">{slide.price}</span>
            <span className="text-gray-500 text-xs mb-2 tracking-widest">OUR PRICE</span>
          </div>
          <button
            onClick={() => addItem(slide.id)}
            className="inline-flex items-center gap-2 bg-gray-200 hover:bg-[#F16E10] hover:text-white text-gray-700 px-6 py-2.5 rounded-full transition-colors duration-200 text-sm font-medium"
          >
            <ShoppingCart size={16} className="text-[#F16E10] group-hover:text-white" />
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        <button
          onClick={() => setCurrent((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="w-8 h-8 flex items-center justify-center border border-gray-400 hover:border-[#F16E10] hover:text-[#F16E10] transition-colors rounded"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setCurrent((current + 1) % HERO_SLIDES.length)}
          className="w-8 h-8 flex items-center justify-center border border-gray-400 hover:border-[#F16E10] hover:text-[#F16E10] transition-colors rounded"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
