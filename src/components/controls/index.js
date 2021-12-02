import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";

import "./styles.css";

function Controls({ basket, onClickCart, product }) {
  return (
    <div className="Controls">
      <span>
        В корзине:
        {product
          ? `  ${product} ${plural(product, "товар", "товара", "товаров")}`
          : null}{" "}
        / {basket ? `${basket}` : "пусто"} ₽
      </span>
      <button onClick={onClickCart}> Перейти</button>
    </div>
  );
}
Controls.propTypes = {
  onCreate: propTypes.func.isRequired,
};

Controls.defaultProps = {
  onCreate: () => {},
};

export default React.memo(Controls);
