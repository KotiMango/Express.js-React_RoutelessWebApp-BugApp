const express = require('express');
const cookieParser = require('cookie-parser');
const todoService = require('./services/todo.service');
const cors = require('cors');
//import service
const corsConfig = {
  origin: true,
  credentials: true,
};
const app = express();
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.get('/', (req, res) => res.send('Hello!'));
app.get('/api/todo', (req, res) => {
  todoService.query().then((todo) => {
    res.send(todo);
  });
});

app.get('/api/todo/save', (req, res) =>
  todoService
    .save({
      _id: req.query._id,
      txt: req.query.txt,
      content: req.query.content,
      importance: req.query.importance,
      color: '#' + req.query.color,
      category: req.query.category,
    })
    .then((savedTodo) => res.send(savedTodo))
);

app.get('/api/todo/:todoId', (req, res) => {
  var visitArr = req.cookies.visitArr || [];
  if (visitArr.length >= 3) return undefined;
  visitArr.push(req.params.todoId);
  res.cookie('visitArr', visitArr, { maxAge: 180000 });
  todoService
    .getById(req.params.todoId)
    .then((todo) => res.send(todo));
});

app.get('/api/todo/:todoId/remove', (req, res) => {
  const { todoId } = req.params;
  todoService
    .removeTodo(todoId)
    .then(() => res.send(`todo ${todoId} was remove successfully`));
});

app.listen(2556, () => console.log('server on port 2556'));
