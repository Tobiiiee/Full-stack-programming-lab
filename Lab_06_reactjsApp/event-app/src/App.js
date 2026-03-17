import { useState } from 'react';
import './App.css';

function Actions() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const colors = ['#ffeeba', '#c3e6cb', '#bee5eb', '#f5c6cb', '#d6d8db'];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', padding: '40px', textAlign: 'center', transition: 'background-color 0.4s' }}>
      <h1>Interactive Buttons App</h1>

      <button
        onClick={() => setMessage('Hello! You clicked the message button')}
        onMouseOver={() => setHoveredBtn('msg')}
        onMouseOut={() => setHoveredBtn(null)}
        style={btnStyle('#007bff', hoveredBtn === 'msg')}
      >
        Show Message
      </button>

      <button
        onClick={() => setBgColor(getRandomColor())}
        onMouseOver={() => setHoveredBtn('bg')}
        onMouseOut={() => setHoveredBtn(null)}
        style={btnStyle('#28a745', hoveredBtn === 'bg')}
      >
        Change Background
      </button>

      <button
        onClick={() => alert('🚨 Alert! Button was clicked!')}
        onMouseOver={() => setHoveredBtn('alert')}
        onMouseOut={() => setHoveredBtn(null)}
        style={btnStyle('#dc3545', hoveredBtn === 'alert')}
      >
        Show Alert
      </button>

      {message && <p style={{ marginTop: '30px', fontSize: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

function btnStyle(color, hovered) {
  return {
    backgroundColor: color,
    color: hovered ? 'yellow' : 'white',
    padding: '12px 24px',
    margin: '10px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  };
}

function App() {
  return <Actions />;
}

export default App;