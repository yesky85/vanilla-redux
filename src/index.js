import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newObj = { text: action.text, id: Date.now() };
      return [...state, newObj];
    case DELETE_TODO:
      const cleanedObj = state.filter((toDo) => toDo.id !== action.id);
      return cleanedObj;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const createToDo = (toDo) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.innerHTML = "DEL";
  btn.addEventListener("click", dispatchDeleteToDo);
  li.innerHTML = toDo.text;
  li.id = toDo.id;
  li.appendChild(btn);
  ul.appendChild(li);
};

const paintToDo = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    createToDo(toDo);
  });
};

store.subscribe(paintToDo);

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
