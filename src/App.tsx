import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";

function App() {
  const [todos, setTodos] = useState<any>([]); // 空の配列を初期値にして真っ白な画面にするクリック後はデータ表示される
  const onClickFetchData = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      setTodos(res.data);
    });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map(todo =>
        <Todo title={todo.title} userid={todo.uderid} />
      )}
    </div>
  );
}

export default App;
