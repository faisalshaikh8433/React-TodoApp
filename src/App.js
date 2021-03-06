import React from 'react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props); // calling reactcomponents constructor first to get all its properties and function to get state 
    this.state = {
      tasks: [
        {
          name: 'Learning',
          completed: true
        },
        {
          name: 'Eating',
          completed: false
        },
        {
          name: 'Sleeping',
          completed: false
        }
      ],
      users: [],
      currentTask: "",
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        this.setState({
          users
        });
      })
  }

  changeStatus = (index) => {
    // console.log(index)

    // let tasks = this.state.tasks;
    // let task = tasks[index];
    // task.completed = !task.completed;
    // this.setState({
    //   tasks: tasks
    // })

    this.setState({
      tasks: this.state.tasks.map((task, i) => {
        if (index === i) {
          task.completed = !task.completed;
        }
        return task;
      })
    })

  }

  updateCurrentTask = (event) => {
    this.setState({
      currentTask: event.target.value
    })
  }

  updateTaskName = (name, index) => {
    let tasks = this.state.tasks;
    let task = tasks[index];
    task["name"] = name;
    this.setState({
      tasks
    });
  }

  addCurrentTask = (event) => {
    event.preventDefault();
    let tasks = this.state.tasks;
    let currentTask = this.state.currentTask;
    tasks.push({
      name: currentTask,
      completed: false
    });
    this.setState({
      tasks,
      currentTask: ""
    })
  }

  deleteTask = (index) => {
    let tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({
      tasks
    })
  }

  render() {
    const { tasks, users } = this.state;
    return (
      <div>
        <h1 className="heading">
          Todo's List
        </h1>
        <TodoForm
          currentTask={this.state.currentTask}
          updateCurrentTask={this.updateCurrentTask}
          addCurrentTask={this.addCurrentTask}
        />
        <div style={divStyles}>
          <ul style={ulStyles}>
            {
              tasks.map((task, i) =>
                <TodoItem
                  clickHandler={this.changeStatus}
                  removeTask={this.deleteTask}
                  updateTaskName={this.updateTaskName}
                  key={i}
                  index={i}
                  todo={task}
                />
              )
            }
          </ul>
        </div>
        <div>
          <h3>Users</h3>
          <table style={tabStyles}>
            <thead>
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              {
                users.map(user =>
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const divStyles = {
  maxWidth: "749px",
  margin: "0 auto",
}

const ulStyles = {
  padding: "0px",
}

const tabStyles = {
  width: "100%"
}


export default App;
