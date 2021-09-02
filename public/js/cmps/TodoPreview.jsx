export function TodoPreview({ todo, onOpenTodo, onDeleteTodo }) {
  return (
    <div className='preview' style={{ backgroundColor: todo.color }}>
      <div onClick={() => onOpenTodo(todo)}>{todo.txt}</div>
      <button onClick={() => onDeleteTodo(todo._id)}>delete</button>
    </div>
  );
}
