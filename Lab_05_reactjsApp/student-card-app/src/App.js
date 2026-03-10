import './App.css';

function StudentCard(props) {
  return (
    <div style={{
      backgroundColor: props.color || '#f0f0f0',
      padding: '20px',
      margin: '10px',
      borderRadius: '8px',
      width: '300px'
    }}>
      <h2>Name: {props.name}</h2>
      <p>Roll No: {props.rollNo}</p>
      <p>Department: {props.department}</p>
      <p>University: {props.university}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Student Information Cards</h1>
      <StudentCard
        name="Ayaan"
        rollNo="101"
        department="Software Engineering"
        university="Air University"
        color="#cce5ff"
      />
      <StudentCard
        name="Farhan"
        rollNo="102"
        department="Computer Science"
        university="Air University"
        color="#d4edda"
      />
      <StudentCard
        name="Musharaf"
        rollNo="103"
        department="AI & ML"
        university="Air University"
        color="#fff3cd"
      />
    </div>
  );
}

export default App;