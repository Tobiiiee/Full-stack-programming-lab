import './App.css';

function CourseItem(props) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '15px',
      margin: '10px',
      borderRadius: '8px',
      borderLeft: '5px solid #007bff'
    }}>
      <h3>{props.courseName}</h3>
      <p>Instructor: {props.instructor}</p>
      <p>Duration: {props.duration}</p>
      <span style={{
        backgroundColor: props.courseType === 'Online' ? '#28a745' : '#fd7e14',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '13px'
      }}>
        {props.courseType}
      </span>
    </div>
  );
}

const courses = [
  { courseName: "Full Stack Dev", instructor: "Mr. Sharif", duration: "6 Weeks", courseType: "Online" },
  { courseName: "Node.js", instructor: "Mr. Ahmed", duration: "8 Weeks", courseType: "Offline" },
  { courseName: "MongoDB", instructor: "Ms. Ayesha", duration: "4 Weeks", courseType: "Online" },
  { courseName: "Express.js", instructor: "Mr. Ali", duration: "5 Weeks", courseType: "Offline" },
  { courseName: "React JS", instructor: "Mr. Usman", duration: "12 Weeks", courseType: "Online" },
];

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Course List</h1>
      {courses.map((course, index) => (
        <CourseItem
          key={index}
          courseName={course.courseName}
          instructor={course.instructor}
          duration={course.duration}
          courseType={course.courseType}
        />
      ))}
    </div>
  );
}

export default App;