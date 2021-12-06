import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";

import "./styles.css";

function Controls({ basketCount, basketPrice, onClickCart }) {
  return (
    <div className="Controls">
      <span>
        В корзине:
        {basketCount
          ? `  ${basketCount} ${plural(
              basketCount,
              "товар",
              "товара",
              "товаров"
            )}`
          : null}{" "}
        / {basketPrice ? `${basketPrice}` : "пусто"} ₽
      </span>
      <button onClick={onClickCart}> Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onClickCart: propTypes.func.isRequired,
};

Controls.defaultProps = {
  onClickCart: () => {},
};

export default React.memo(Controls);
