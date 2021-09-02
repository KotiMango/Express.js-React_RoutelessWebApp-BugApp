import { todoService } from '../js/services/todo.services.js';
import { TodoAdd } from '../js/cmps/TodoAdd.jsx';
import { TodoDetails } from '../js/cmps/TodoDetails.jsx';
import { TodoPage } from './TodoPage.jsx';

const PAGE_TYPES = {
  TODOS: 'todos',
  READING_TODO: 'reading_todo',
  COMPSING_TODO: 'compsing_todo',
};

export class TodoApp extends React.Component {
  state = {
    currentPage: PAGE_TYPES.TODOS,
    todos: [],
    openedTodo: {},
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    todoService.query().then((todos) => this.setState({ todos }));
  };

  getBack = () => {
    this.setState(
      { currentPage: PAGE_TYPES.TODOS },
      this.getMainPageView
    );
  };

  onAddTodo = (todo) => {
    todoService.add(todo).then(this.loadTodos());
  };

  getMainPageView = () => {
    const { currentPage } = this.state;

    switch (currentPage) {
      case PAGE_TYPES.TODOS:
        return (
          <TodoPage
            todos={this.state.todos}
            onOpenTodo={this.onOpenTodo}
            onDeleteTodo={this.onDeleteTodo}
            onToggleCompose={this.onToggleCompose}
          />
        );
      case PAGE_TYPES.READING_TODO:
        return (
          <TodoDetails
            todo={this.state.openedTodo}
            getBack={this.getBack}
          />
        );
      case PAGE_TYPES.COMPSING_TODO:
        return (
          <TodoAdd
            getBack={this.getBack}
            onAddTodo={this.onAddTodo}
          />
        );
    }
  };

  onOpenTodo = (openedTodo) => {
    todoService.getById(openedTodo._id).then((todo) => {
      this.setState(
        {
          openedTodo,
          currentPage: PAGE_TYPES.READING_TODO,
        },
        this.getMainPageView
      );
    });
  };

  onDeleteTodo = (id) => {
    todoService.remove(id).then(() => {
      this.loadTodos();
    });
  };
  onToggleCompose = () => {
    this.setState(
      { currentPage: PAGE_TYPES.COMPSING_TODO },
      this.getMainPageView
    );
  };
  render() {
    const { currentPage } = this.state;
    const mainPageView = this.getMainPageView();
    return (
      <section>
        <div>{mainPageView}</div>
      </section>
    );
  }
}
