import React from "react";

import "./style.css";
function Modal({ basket, basketCount, basketPrice, onCloseCart }) {
  return (
    <div className="drawer">
      <h2>
        Корзина
        <button onClick={onCloseCart} className="btn">
          Закрыть
        </button>
      </h2>
      <div className="List">
        {basket.map((item) => (
          <div className="List__item" key={item.title}>
            <div className="Modal__number">
              {item.code}
              <div className="Modal__title">{item.title}</div>
              <div className="Modal__price">{item.price + "₽"}</div>
              <div className="number">{item.quantity} шт</div>
            </div>
          </div>
        ))}
        <div className="total">
          Итого: {basketPrice} ₽
          <div className="result">{basketCount + "шт."} </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
