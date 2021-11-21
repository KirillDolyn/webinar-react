import React from "react";
import "../style.css";
import { List } from "./List";
/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button onClick={() => store.createItem()}> Добавить</button>
      </div>
      <div className="App__center">
        <List store={store} />
      </div>
    </div>
  );
}

export default App;
