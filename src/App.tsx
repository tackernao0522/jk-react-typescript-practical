import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";
import { TodoType } from "./types/todo";
import { Text } from "./Text";

function App() {
  const [todos, setTodos] = useState<Array<TodoType>>([]); // 空の配列を初期値にして真っ白な画面にするクリック後はデータ表示される
  const onClickFetchData = () => {
    axios
      .get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos")
      .then(res => {
        setTodos(res.data);
      });
  };
  return (
    <div className="App">
      <Text color="red" fontSize="18px" />
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          title={todo.title}
          userId={todo.userId}
          completed={todo.completed}
        />
      )}
    </div>
  );
}

export default App;
