## React with TypeScriptをインストール

+ `$ npx create-react-app {プロジェクト名} --template typescript`<br>

+ `tsconfig.json`の設定<br>

```
{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
    // "strict": true, // コメントアウトしておく
    "esModuleInterop": true,
    "lib": [
      "dom",
      "ES2015"
    ],
    "jsx": "react-jsx"
  }
}
```

+ `$ npm install axios --save or $ yarn add axios --save` axiosをインストール<br>

+ `App.tsx`を編集<br>

```
import axios from "axios";
import React from "react";
import "./App.css";

function App() {
  const onClickFetchData = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      console.log(res);
    });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
    </div>
  );
}

export default App;
```

## 型がないのでバグが発生しているアプリの例

`App.tsx`を編集<br>

```
import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<any>([]); // 空の配列を初期値にして真っ白な画面にするクリック後はデータ表示される any型を指定している
  const onClickFetchData = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      setTodos(res.data);
    });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map(todo =>
        <p>
          {todo.title}
        </p>
      )}
    </div>
  );
}

export default App;
```

+ `src/Todo.tsx`コンポーネントを作成<br>

```
export const Todo = (props) => {
    const { title, userid } = props;
    return <p>{`${title}(ユーザー: ${userid})`}</p>
}
```

+ `App.tsx`を編集<br>

```
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
```

※ 結果 useridはundefinedとなってしまう例である<br>

## 取得データの型を定義しバグを防止

+ `App.tsx`を編集<br>

```
import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";

// それぞれの型を定義
type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  // useStateの配列の型を指定
  const [todos, setTodos] = useState<Array<TodoType>>([]); // 空の配列を初期値にして真っ白な画面にするクリック後はデータ表示される
  const onClickFetchData = () => {
    // axiosの型を指定
    axios.get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos").then(res => {
      setTodos(res.data);
    });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map(todo => <Todo title={todo.title} userid={todo.userId} />)} // useridとなっていたのでuserIdを修正
    </div>
  );
}

export default App;
```

## propsに型を定義する

+ `src/Todo.tsx`を編集<br>

```
type TodoType = {
    userId: number;
    title: string;
    completed?: boolean; // ?はあってもなくても良いという意味
};

export const Todo = (props: TodoType)    => {
    const { title, userId, completed = false } = props; // completedのデフォルト値をfalseにしている useridをuserIdに修正
    const completeMark = completed ? "[完]" : "[未]";
    return <p>{`${completeMark} ${title}(ユーザー: ${userId})`}</p>; // useridをuserIdに修正
};
```

+ `App.tsx`を編集<br>

```
import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";

type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Array<TodoType>>([]); // 空の配列を初期値にして真っ白な画面にするクリック後はデータ表示される
  const onClickFetchData = () => {
    axios.get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos").then(res => {
      setTodos(res.data);
    });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map(todo => <Todo key={todo.id} title={todo.title} userId={todo.userId} completed={todo.completed} />)}
    </div>
  );
}

export default App;
```

## 型定義を効率的に管理する

+ `src/types`ディレクトリを作成<br>

+ `src/types/todo.ts`ファイルを作成<br>

```
export type TodoType = {
    userId: number;
    id: number;
    title: string;
    completed?: boolean;
};
```

+ `App.tsx`を編集<br>

```
import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";
import { TodoType } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Array<TodoType>>([]); // 空の配列を初期値にして真っ白な画面にするクリック後はデータ表示される
  const onClickFetchData = () => {
    axios.get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos").then(res => {
      setTodos(res.data);
    });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map(todo => <Todo key={todo.id} title={todo.title} userId={todo.userId} completed={todo.completed} />)}
    </div>
  );
}

export default App;
```

+ `src/Todo.tsx`を編集<br>

```
import { TodoType } from "./types/todo";

export const Todo = (
    // props: Pick<TodoType, "userId" | "title" | "completed"> // TodoTypeの型定義をできる
    props: Omit<TodoType, "id"> // Omitはその逆でidを覗くことができる
) => {
    const { title, userId, completed = false } = props; // completedのデフォルト値をfalseにしている
    const completeMark = completed ? "[完]" : "[未]";
    return <p>{`${completeMark} ${title}(ユーザー: ${userId})`}</p>;
};
```
