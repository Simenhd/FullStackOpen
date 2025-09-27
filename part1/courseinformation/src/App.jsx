const Header = (props) => <h1>{props.course}</h1>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ course }) => (
  <ul>
    {course.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Total = ({course}) => {
  const sum = course.reduce(function(sum, part) {
    return sum + part.exercises}, 0)
  

  return (
    <p>total of {sum} exercises</p>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content course = {course.parts} />
      <Total course = {course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
