import './App.css';

function Greeting(props) {
  let message = '';

  if (props.timeOfDay === 'morning') {
    message = 'Good Morning';
  } else if (props.timeOfDay === 'afternoon') {
    message = 'Good Afternoon';
  } else if (props.timeOfDay === 'evening') {
    message = 'Good Evening';
  } else {
    message = 'Good Night';
  }

  return (
    <div style={{
      backgroundColor: props.bgColor || '#f0f0f0',
      padding: '20px',
      margin: '10px',
      borderRadius: '8px',
      width: '300px'
    }}>
      <h2>{message}, {props.name}!</h2>
      <p>Time of Day: {props.timeOfDay}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dynamic Greeting App</h1>
      <Greeting name="Ayaan"      timeOfDay="morning"   bgColor="#fff9c4" />
      <Greeting name="Farhan"     timeOfDay="afternoon" bgColor="#c8e6c9" />
      <Greeting name="Musharaf" timeOfDay="evening"   bgColor="#bbdefb" />
      <Greeting name="Amir"     timeOfDay="night"     bgColor="#e1bee7" />
    </div>
  );
}

export default App;