import Link from 'next/link';

const FALLBACK_DEALS = [
  {
    title:    'Elite Collection',
    subtitle: 'Design Furniture',
    image:    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700',
    discount: '35%',
    link:     '/shop?tag=featured',
  },
  {
    title:    'Reclaimed and Hand Crafted',
    subtitle: 'Sale OFF',
    image:    'https://images.unsplash.com/photo-1595428773025-80d97f10ccba?w=700',
    discount: '50%',
    link:     '/shop?tag=special',
  },
];

export default function HotDeals({ deals }) {
  const items = deals?.length ? deals : FALLBACK_DEALS;

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl text-center text-gray-800 tracking-wide mb-8">Hot Deal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.slice(0, 2).map((deal, i) => (
            <Link key={i} href={deal.link || '/'}>
              <div className="relative overflow-hidden rounded group cursor-pointer h-52 md:h-64">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-white text-sm font-medium">{deal.title}</p>
                  <p className="text-[#F16E10] text-base font-bold">{deal.subtitle}</p>
                  <p className="text-white font-black text-3xl">
                    Sale OFF <span className="text-[#F16E10]">{deal.discount}</span>
                  </p>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-[#F16E10] text-white rounded-full w-16 h-16 flex flex-col items-center justify-center text-center shadow-lg">
                  <span className="font-black text-lg leading-none">{deal.discount}</span>
                  <span className="text-xs leading-none">Sale Off</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
