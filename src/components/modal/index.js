import React from "react";

import "./style.css";
function Modal({ onCloseCart, items, basket }) {
  return (
    <div className="drawer">
      <h2>
        Корзина
        <button onClick={onCloseCart} className="btn">
          Закрыть
        </button>
      </h2>
      <div className="List">
        {items.map((item) => (
          <div className="List__item" key={item.title}>
            <div className="Modal__number">
              {item.code}
              <div className="Modal__title">{item.title}</div>
              <div className="Modal__price">{item.price + "₽"}</div>
              <div className="number">1 шт</div>
            </div>
          </div>
        ))}
        <div className="total">Итого: {basket} ₽ </div>
      </div>
    </div>
  );
}

export default Modal;
