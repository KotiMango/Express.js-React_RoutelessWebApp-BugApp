export const todoService = {
  query,
  getById,
  remove,
  add,
};

function query() {
  return axios.get('/api/todo').then((res) => res.data);
}
function getById(todoId) {
  return axios
    .get(`/api/todo/${todoId}`, { withCredentials: true })
    .then((res) => res.data);
}
function remove(todoId) {
  return axios
    .get(`/api/todo/${todoId}/remove`)
    .then((res) => res.data);
}
function add(todo) {
  const url = todo._id
    ? `/api/todo/save?_id=${todo._id}&txt=${todo.txt}&content=${
        todo.content
      }&importance=${todo.importance}&color=${todo.color.substring(
        1
      )}&category=${todo.category}`
    : `/api/todo/save?txt=${todo.txt}&content=${
        todo.content
      }&importance=${todo.importance}&color=${todo.color.substring(
        1
      )}&category=${todo.category}`;
  console.log(todo, url);
  return axios.get(url).then((res) => res.data);
}
