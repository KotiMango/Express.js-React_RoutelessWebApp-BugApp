export function TodoDetails({ todo, getBack }) {
  return (
    <section>
      <h1>meow</h1>
      <div onClick={getBack}>
        <ul
          className='details'
          style={{ backgroundColor: todo.color }}
        >
          <li>
            <h2>{todo.txt}</h2>
          </li>
          <li>{todo.content}</li>
          <li>Importance : {todo.importance}</li>
          <li>Category : {todo.category}</li>
        </ul>
      </div>
    </section>
  );
}
