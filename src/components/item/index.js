import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./styles.css";

function Item({ item, onSelect, onAdd, code, title, price }) {
  const [counter, setCounter] = useState(0);
  const [added, setAdded] = useState(false);

  const callbacks = {
    onClick: useCallback(() => {
      // onSelect(item.code);
      // if (!item.selected){
      setCounter(counter + 1);
      // }
    }, [item, onSelect, counter, setCounter]),
  };

  const addOnClick = () => {
    onAdd({ code, title, price });
    setAdded(added);
  };

  return (
    <div
      className={"Item" + (item.selected ? " Item_selected" : "")}
      onClick={callbacks.onClick}
    >
      <div className="Item__number">{item.code}</div>
      <div className="Item__title">
        {item.title}
        {counter
          ? ` | Выделялся ${counter} ${plural(counter, "раз", "раза", "раз")}`
          : null}
      </div>

      <div className="Item__actions">
        <div className="price">{item.price + "₽"} </div>
        <button onClick={addOnClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {},
};

export default React.memo(Item);
