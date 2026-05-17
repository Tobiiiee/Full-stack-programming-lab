import Link from 'next/link';

const FOOTER_COLS = [
  {
    title: 'INFORMATIONS',
    links: ['Terms and conditions', 'About us', 'Sitemap', 'Contact', 'Return policy', 'Suppliers'],
  },
  {
    title: 'MY ACCOUNT',
    links: ['Your account', 'Information', 'Addresses', 'Orders history', 'Delivery information', 'Search terms'],
  },
  {
    title: 'HELP AND MORE',
    links: ['New products', 'Top sellers', 'Manufacturers', 'Suppliers', 'Specials'],
  },
  {
    title: 'LINKS',
    links: ['Delivery', 'Service', 'Gift Cards', 'Mobile', 'Manufacturers'],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* Main footer */}
      <div className="bg-[#555555] py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[#F16E10] text-xs font-bold tracking-widest uppercase mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <Link href="/" className="text-gray-300 text-xs hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Orange bottom bar */}
      <div className="bg-[#F16E10] py-2 px-4">
        <p className="text-white text-xs text-center">
          © 2014 Rustik Plank Furniture - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
