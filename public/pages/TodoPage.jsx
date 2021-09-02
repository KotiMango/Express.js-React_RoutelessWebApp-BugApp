import { TodoPreview } from '../js/cmps/TodoPreview.jsx';

export function TodoPage({
  todos,
  onOpenTodo,
  onDeleteTodo,
  onToggleCompose,
}) {
  return (
    <section>
      <button onClick={onToggleCompose}>Add a Todo</button>
      <div className='todos'>
        {todos.map((todo) => (
          <TodoPreview
            key={todo._id}
            todo={todo}
            onOpenTodo={onOpenTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </div>
    </section>
  );
}
