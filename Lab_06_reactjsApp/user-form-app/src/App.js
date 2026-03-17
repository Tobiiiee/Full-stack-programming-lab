import { useState } from 'react';
import './App.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = () => {
    if (!name || !email) return;
    setSubmitted({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h1>User Form</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleSubmit} style={btnStyle}>Submit</button>

      {submitted && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px' }}>
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = { display: 'block', width: '100%', padding: '10px', margin: '10px 0', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' };
const btnStyle = { backgroundColor: '#007bff', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' };

function App() {
  return <UserForm />;
}

export default App;