const fs = require('fs');
const gTodos = require('../data/todo.json');

function query() {
  return Promise.resolve(gTodos);
}

function getById(todoId) {
  const todo = gTodos.find((todo) => todo._id === todoId);
  return Promise.resolve(todo);
}

function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo._id === todoId);
  gTodos.splice(idx, 1);
  return _saveTodosToFile();
}

function save(todo) {
  console.log(todo._id);
  if (todo._id) {
    const idx = gTodos.findIndex(
      (currTodo) => currTodo._id === todo._id
    );
    gTodos[idx] = todo;
  } else {
    todo._id = _makeId();
    gTodos.push(todo);
  }
  return _saveTodosToFile().then(() => {
    return todo;
  });
}

module.exports = {
  query,
  getById,
  save,
  removeTodo,
};

function _makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return txt;
}

function _saveTodosToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      'data/todo.json',
      JSON.stringify(gTodos, null, 2),
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}
