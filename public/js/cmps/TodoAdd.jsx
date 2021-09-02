export class TodoAdd extends React.Component {
  state = {
    todo: {
      txt: '',
      content: '',
      importance: 1,
      color: '#FFA07A',
      category: '',
    },
  };
  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === 'number'
        ? +ev.target.value
        : ev.target.value;
    this.setState({ todo: { ...this.state.todo, [field]: value } });
  };

  onSave = (ev) => {
    ev.preventDefault();
    this.props.onAddTodo(this.state.todo);
    ev.target.reset();
    this.setState(
      {
        todo: {
          txt: '',
          content: '',
          importance: 1,
          color: '#FFA07A',
          category: '',
        },
      },
      this.props.getBack
    );
  };
  onRegret = () => {
    this.setState(
      {
        todo: {
          txt: '',
          content: '',
          importance: 1,
          color: '#FFA07A',
          category: '',
        },
      },
      this.props.getBack
    );
  };

  render() {
    const {
      txt,
      content,
      importance,
      color,
      category,
    } = this.state.todo;
    return (
      <div>
        <button onClick={this.onRegret}>Back</button>
        <form className='todo-add' onSubmit={this.onSave}>
          <input
            type='text'
            name='txt'
            value={txt}
            placeholder='add a text'
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='content'
            value={content}
            placeholder='add a content'
            onChange={this.handleChange}
          />
          <select
            name='importance'
            value={importance}
            onChange={this.handleChange}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <input
            type='color'
            name='color'
            value={color}
            onChange={this.handleChange}
          />
          <select
            name='category'
            value={category}
            onChange={this.handleChange}
          >
            <option value='Must'>Must</option>
            <option value='Nice To Have'>Nice To Have</option>
            <option value='Optional'>Optional</option>
          </select>
          <button>ADD</button>
        </form>
      </div>
    );
  }
}
