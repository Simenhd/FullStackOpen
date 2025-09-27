const Header = (props) => <h1>{props.course}</h1>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ courses }) => (
  <ul>
    {courses.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Total = ({courses}) => {
  const sum = courses.reduce(function(sum, part) {
    return sum + part.exercises}, 0)
  

  return (
    <p>total of {sum} exercises</p>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content courses={course.parts} />
      <Total courses={course.parts} />
    </div>
  );
};

export default Course;