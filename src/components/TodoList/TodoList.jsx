import React, { useEffect, useState } from "react";
import Addtodo from "../AddTodo/Addtodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(readTodosFromLocalStorage);

  const handleAdd = (todo) => setTodos([...todos, todo]);
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  //todo가 변경이 될 때마다 localStorage안의 setItem에 todos라는 key에 객체(배열)를 저장. 배열이기 때문에 JSON으로 변환
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <Addtodo onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStorage() {
  //localStorage에서 todos를 읽어옴
  const todos = localStorage.getItem("todos");
  //todos가 있다면 JSON 변환해서 배열로 만들어주고, 저장된 todo가 없다면 빈 배열 반환
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
