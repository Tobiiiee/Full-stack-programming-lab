import Link from 'next/link';

export default function CategoryCards({ categories }) {
  const display = categories?.slice(0, 3) || [
    { name: 'Chairs',  slug: 'chairs',  image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300' },
    { name: 'Beds',    slug: 'beds',    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300' },
    { name: 'Tables',  slug: 'tables',  image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=300' },
  ];

  const labels = ['CHAIRS', 'BEDS', 'TABALES'];

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {display.map((cat, i) => (
          <Link key={cat.slug || i} href={`/shop?category=${cat.slug || cat.name?.toLowerCase()}`}>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-gray-800 tracking-wide uppercase">
                  {labels[i] || cat.name?.toUpperCase()}
                </h3>
                <p className="text-[#F16E10] text-sm font-semibold tracking-wider">COLLECTION</p>
              </div>
              <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded">
                <img
                  src={cat.image || `https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200`}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
