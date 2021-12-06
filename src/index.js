import React from "react";
import ReactDOM from "react-dom";
import Store from "./store.js";
import App from "./app.js";

const root = document.getElementById("app");

// console.log("index.js");

// Состояние приложения
const store = new Store({
  items: [
    { code: 1, title: "Название элемента", price: 100, quantity: 1 },
    { code: 2, title: "Книга про React", price: 770, quantity: 1 },
    { code: 3, title: "Хлеб", price: 43, quantity: 1 },
    { code: 4, title: "Трактор", price: 7654320, quantity: 1 },
    { code: 5, title: "Телефон iPhone XIXV", price: 120000, quantity: 1 },
    { code: 6, title: "Карандаши цветные", price: 111, quantity: 1 },
    { code: 7, title: "Товар сюрприз", price: 0, quantity: 1 },
  ],
  basket: [],
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store} />, root);
