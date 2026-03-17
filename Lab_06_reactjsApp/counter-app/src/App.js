import { useState } from 'react';
import './App.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter App</h1>
      <h2 style={{ fontSize: '60px', margin: '20px' }}>{count}</h2>
      <button onClick={() => setCount(count + 1)} style={btnStyle('#28a745')}>Increment</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)} style={btnStyle('#dc3545')}>Decrement</button>
      <button onClick={() => setCount(0)} style={btnStyle('#6c757d')}>Reset</button>
    </div>
  );
}

function btnStyle(color) {
  return { backgroundColor: color, color: 'white', padding: '10px 20px', margin: '5px', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' };
}

function App() {
  return <Counter />;
}

export default App;