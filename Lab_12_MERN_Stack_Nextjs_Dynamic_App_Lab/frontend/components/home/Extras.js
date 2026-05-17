import Link from 'next/link';

export function BuyOnlineBanner() {
  return (
    <section className="bg-yellow-100 py-5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="bg-green-600 text-white px-5 py-3 rounded text-center">
          <p className="font-black text-lg leading-tight">BUY ONLINE</p>
          <p className="font-black text-lg leading-tight">PICK UP IN STORE</p>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold text-gray-700 text-sm">NOW AVAILABLE IN OUR STORE SYSTEM</p>
          <p className="text-gray-600 text-xs mt-1">
            AVAILABLE ON SELECT PRODUCTS.{' '}
            <Link href="/about" className="text-[#F16E10] underline hover:no-underline">LEARN MORE</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function LatestUpdates({ blogs }) {
  const items = blogs?.length ? blogs : [
    { _id: '1', title: 'Lorem Ipsum', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', slug: '#' },
    { _id: '2', title: 'Lorem Ipsum', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', slug: '#' },
    { _id: '3', title: 'Lorem Ipsum', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400', slug: '#' },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl text-center text-gray-800 tracking-wide mb-8">Latest Updates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.slice(0, 3).map((blog) => (
            <div key={blog._id} className="bg-white rounded overflow-hidden">
              <div className="h-44 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-4">{blog.excerpt}</p>
                <div className="flex justify-end">
                  <Link href={`/blog/${blog.slug}`}
                    className="text-xs border border-gray-300 px-4 py-1.5 rounded hover:border-[#F16E10] hover:text-[#F16E10] transition-colors">
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandLogos() {
  const brands = ['f4b', 'Australian Gov.', 'QANTAS', 'INTERRISK', 'GE Money', 'Rockwell Collins', 'LexisNexis', 'oh!media'];
  return (
    <section className="py-6 px-4 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8">
        {brands.map(b => (
          <span key={b} className="text-gray-400 text-xs font-semibold tracking-wide grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-gray-700">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
