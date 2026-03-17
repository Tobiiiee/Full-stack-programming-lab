import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// ---------- Navbar ----------
function Navbar() {
  return (
    <nav style={{ backgroundColor: '#343a40', padding: '15px 30px', display: 'flex', gap: '20px' }}>
      {['/', '/about', '/contact', '/products'].map((path, i) => (
        <Link key={i} to={path} style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>
          {['Home', 'About', 'Contact Us', 'Products'][i]}
        </Link>
      ))}
    </nav>
  );
}

// ---------- Home ----------
function Home() {
  return (
    <div style={pageStyle}>
      <h1>Welcome to Our Website</h1>
      <p>This is a multi-page React app built with React Router. Use the navigation above to explore the pages.</p>
    </div>
  );
}

// ---------- About ----------
function About() {
  return (
    <div style={pageStyle}>
      <h1>About Us</h1>
      <p>We are a team of passionate developers building modern web applications using the MERN stack. Our mission is to deliver clean, fast, and user-friendly digital experiences.</p>
    </div>
  );
}

// ---------- Contact ----------
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => { alert(`Message sent by ${form.name}!`); setForm({ name: '', email: '', message: '' }); };

  return (
    <div style={pageStyle}>
      <h1>Contact Us</h1>
      <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} style={inputStyle} />
      <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} style={inputStyle} />
      <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} />
      <button onClick={handleSubmit} style={btnStyle}>Send Message</button>
    </div>
  );
}

// ---------- Products ----------
const productList = [
  { id: 1, title: 'Laptop', description: 'High performance laptop for developers.' },
  { id: 2, title: 'Headphones', description: 'Noise-cancelling wireless headphones.' },
  { id: 3, title: 'Keyboard', description: 'Mechanical keyboard with RGB lighting.' },
  { id: 4, title: 'Monitor', description: '27-inch 4K display monitor.' },
];

function Products() {
  return (
    <div style={pageStyle}>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {productList.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '200px' }}>
            <h3>{p.title}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>{p.description}</p>
            <button onClick={() => alert(`${p.title} added to cart!`)} style={btnStyle}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- 404 ----------
function NotFound() {
  return (
    <div style={{ ...pageStyle, textAlign: 'center' }}>
      <h1 style={{ fontSize: '80px' }}>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/" style={{ color: '#007bff' }}>Go Back Home</Link>
    </div>
  );
}

// ---------- App ----------
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const pageStyle = { padding: '40px', maxWidth: '800px', margin: 'auto' };
const inputStyle = { display: 'block', width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' };
const btnStyle = { backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '8px' };

export default App;