const Course = (props) => {
  return (
    props.courses.map(c => {
      return (
        <div>
        <Header name={c.name} />
        <Content parts={c.parts} />
        <Total exercises={c.parts} />
      </div>
      );
    })
  );
}

const Header = (props) => <h2>{props.name}</h2>

const Content = (props) => {
  return (
    props.parts.map(e => <Part key={e.id} name={e.name} exercises={e.exercises} />)
  );
}

const Part = (props) => <p> {props.name} {props.exercises} </p>

const Total = (props) => <p> total of {props.exercises.reduce((p, n) => p + n.exercises, 0)} exercises.</p>


export default Course;