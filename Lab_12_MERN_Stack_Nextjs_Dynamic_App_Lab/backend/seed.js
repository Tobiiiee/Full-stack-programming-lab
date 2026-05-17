const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const Product  = require('./models/Product');
const Blog     = require('./models/Blog');
const Deal     = require('./models/Deal');

const categories = [
  { name: 'Beds',      slug: 'beds',      description: 'Handcrafted wooden beds',          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
  { name: 'Cabinets',  slug: 'cabinets',  description: 'Reclaimed wood cabinets',          image: 'https://images.unsplash.com/photo-1595428773025-80d97f10ccba?w=400' },
  { name: 'Bookcases', slug: 'bookcases', description: 'Solid wooden bookcases',           image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { name: 'Boxes',     slug: 'boxes',     description: 'Rustic wooden boxes and trunks',   image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { name: 'Chairs',    slug: 'chairs',    description: 'Hand-crafted wooden chairs',       image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400' },
  { name: 'Tables',    slug: 'tables',    description: 'Rustic reclaimed wood tables',     image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await Deal.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const createdCats = await Category.insertMany(categories);
    console.log(`Inserted ${createdCats.length} categories`);

    const catMap = {};
    createdCats.forEach(c => { catMap[c.slug] = c._id; });

    const products = [
      // FEATURED PRODUCTS
      {
        name: 'Round Pedestal Dining Table',
        description: 'A stunning round wooden dining table with a thick solid pedestal base. Crafted from reclaimed oak with a natural finish that highlights the grain.',
        price: 134.99, oldPrice: 169.99,
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400',
        category: catMap['tables'], tag: 'featured',
      },
      {
        name: 'Low-Profile Coffee Table',
        description: 'Minimalist dark wood square coffee table with a low profile. Perfect for modern living rooms. Solid walnut construction.',
        price: 134.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        category: catMap['tables'], tag: 'featured',
      },
      {
        name: 'Rustic Trestle Dining Table',
        description: 'A large rustic rectangular trestle dining table made from reclaimed pine. Seats up to 8. Perfect for family gatherings.',
        price: 134.99, oldPrice: 189.99,
        image: 'https://images.unsplash.com/photo-1571898223706-419a4ae3eb97?w=400',
        category: catMap['tables'], tag: 'featured',
      },
      {
        name: 'Nested Wooden Bowl Set',
        description: 'A beautiful set of three nested round bowls hand-turned from walnut and oak. Perfect as a centrepiece or fruit bowl set.',
        price: 134.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1595428773025-80d97f10ccba?w=400',
        category: catMap['boxes'], tag: 'featured',
      },

      // SPECIAL PRODUCTS
      {
        name: 'High-Back Dining Chair',
        description: 'Classic high-back wooden dining chair with a solid oak frame. Comfortable and durable. Available in multiple finishes.',
        price: 134.99, oldPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        category: catMap['chairs'], tag: 'special',
      },
      {
        name: 'Adirondack Garden Chair',
        description: 'Traditional wooden Adirondack armchair built for outdoor use. Weather-treated pine with a wide slat back for comfort.',
        price: 134.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        category: catMap['chairs'], tag: 'special',
      },
      {
        name: 'Mid-Century Wooden Stool',
        description: 'A beautiful mid-century modern style round wooden stool. Solid teak with tapered legs. Use as a side table or seat.',
        price: 134.99, oldPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400',
        category: catMap['chairs'], tag: 'special',
      },
      {
        name: 'Wooden Storage Trunk',
        description: 'Rectangular wooden storage chest with iron hardware. Perfect for blankets, toys, or at the foot of a bed. Solid pine construction.',
        price: 134.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        category: catMap['boxes'], tag: 'special',
      },

      // POPULAR PRODUCTS
      {
        name: 'Tall 5-Shelf Bookcase',
        description: 'A tall traditional 5-shelf wooden bookcase in solid oak. Adjustable shelves. Perfect for home office or living room.',
        price: 134.99, oldPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        category: catMap['bookcases'], tag: 'popular',
      },
      {
        name: 'Classic Slatted Bed Frame',
        description: 'Classic wooden bed frame with a slatted headboard and footboard. Solid pine. Available in single, double, and king sizes.',
        price: 134.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        category: catMap['beds'], tag: 'popular',
      },
      {
        name: 'Vintage Carved Headboard Bed',
        description: 'An elaborate vintage-style carved dark wood bed frame. Intricate floral detailing on the headboard. A statement piece for any bedroom.',
        price: 134.99, oldPrice: 219.99,
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400',
        category: catMap['beds'], tag: 'popular',
      },
      {
        name: 'Tufted Upholstered Bed Frame',
        description: 'Elegant cream-upholstered tufted headboard bed frame with light wood trim. A perfect blend of luxury and rustic charm.',
        price: 134.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
        category: catMap['beds'], tag: 'popular',
      },

      // EXTRA products for category pages
      {
        name: 'Reclaimed Oak Cabinet',
        description: 'A beautiful reclaimed oak cabinet with two doors and adjustable internal shelving. Rustic character with modern functionality.',
        price: 249.99, oldPrice: 299.99,
        image: 'https://images.unsplash.com/photo-1595428773025-80d97f10ccba?w=400',
        category: catMap['cabinets'], tag: 'featured',
      },
      {
        name: 'Industrial Bookshelf',
        description: 'Open-frame industrial wooden bookshelf with metal accents. 4 shelves. Perfect for displaying books and décor.',
        price: 189.99, oldPrice: null,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        category: catMap['bookcases'], tag: 'special',
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`Inserted ${createdProducts.length} products`);

    const blogs = [
      {
        title: 'The Art of Reclaimed Wood Furniture',
        slug:  'art-of-reclaimed-wood',
        excerpt: 'Discover how reclaimed wood is transformed into stunning pieces of furniture with character and history.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Reclaimed wood furniture carries the marks of time — nail holes, saw marks, weathering — that give each piece a unique story...',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
      },
      {
        title: 'Choosing the Right Wood for Your Home',
        slug:  'choosing-the-right-wood',
        excerpt: 'A guide to the different types of wood used in furniture making and which suits your home best.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. From oak and pine to walnut and teak, the wood you choose defines the character of your furniture...',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
      },
      {
        title: 'How to Care for Your Wooden Furniture',
        slug:  'caring-for-wooden-furniture',
        excerpt: 'Simple tips and tricks to keep your handcrafted wooden furniture looking beautiful for years to come.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proper care and maintenance can extend the life of your wooden furniture significantly...',
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600',
      },
    ];

    await Blog.insertMany(blogs);
    console.log(`Inserted ${blogs.length} blogs`);

    const deals = [
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

    await Deal.insertMany(deals);
    console.log(`Inserted ${deals.length} deals`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
