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
