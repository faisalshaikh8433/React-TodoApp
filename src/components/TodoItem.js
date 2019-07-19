import React from 'react';
import PropTypes from 'prop-types';
import '../css/TodoItem.css'


class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      taskName: this.props.todo.name,
    }
  }

  toggleEdit = () => {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing
    });
  }

  updateTaskName = (e) => {
    this.setState({
      taskName: e.target.value
    });
  }

  updateTask = (e) => {
    e.preventDefault();
    const { updateTaskName, index } = this.props
    const newName = this.state.taskName;
    updateTaskName(newName, index);
    this.toggleEdit();
  }

  renderForm = () => {
    const { name } = this.props.todo;
    return (
      <form onSubmit={this.updateTask}>
        {/* <input type='text' ref={(ele) => this.input = ele} defaultValue={name} /> */}
        {<input type='text' value={this.state.taskName} onChange={this.updateTaskName} />}
        <button className='updbtn' type='submit'>Update</button>
      </form>
    )
  }

  renderItems = () => {
    const { name, completed } = this.props.todo;
    return (
      <li style={liStyles} onClick={() => this.props.clickHandler(this.props.index)}
        className={completed ? 'completed' : ''}>
        <span>{name}</span>
        <div>
          <button className='delbtn'
            onClick={() => {
              this.props.removeTask(this.props.index)
            }}
          >X
        </button>
          <button className="editbtn" onClick={this.toggleEdit}>Edit</button>
        </div>
      </li>
    )
  }

  render() {
    const { isEditing } = this.state;
    return (
      isEditing ? this.renderForm() : this.renderItems()
    )
  }
}

// TodoItem.defaultProps = {
//   clickHandler: ()=>{

//   }
// }

const liStyles = {
  marginTop: "10px",
  display: "flex",
  listStyle: "none",
  justifyContent: "space-between",
  padding: '10px',
  border: '1px solid #999'
}

TodoItem.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  updateTaskName: PropTypes.func,
  removeTask: PropTypes.func,
  index: PropTypes.number,
  todo: PropTypes.object,
}

export default TodoItem;
