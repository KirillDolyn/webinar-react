import React from "react";

export function ListItem({ item, store }) {
  const [state, setState] = React.useState(0);

  const count = () => {
    setState(state + 1);
  };

  return (
    <div
      key={item.code}
      className={"List__item" + (item.selected ? " List__item_selected" : "")}
    >
      <div className="Item" onClick={() => store.selectItem(item.code)}>
        <div className="Item__number">{item.code}</div>
        <div onClick={count} className="Item__title">
          {item.title} | Вывелся {state} раз
        </div>

        <div className="Item__actions">
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
