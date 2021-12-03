import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  // console.log("App");
  const [modal, setModal] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const basket = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const result = cartItems.reduce((res, item) => res + item.quantity, 0);
  const product = cartItems.reduce((prev) => prev + 1, 0);

  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    onDeleteItem: useCallback((code) => store.deleteItem(code), [store]),
  };
  const { items } = store;
  const onAddCart = (items) => {
    const exist = cartItems.find((x) => x.code === items.code);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.code === items.code ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...items, quantity: 1 }]);
    }
  };

  const onClickCart = () => {
    setModal(true);
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        basket={basket}
        product={product}
        onClickCart={onClickCart}
        onCreate={callbacks.onCreateItem}
      />

      <List
        items={store.getState().items}
        onSelectItem={callbacks.onSelectItem}
        onAddCart={onAddCart}
      />
      {modal && (
        <Modal
          items={cartItems}
          basket={basket}
          result={result}
          onCloseCart={() => setModal(false)}
        />
      )}
    </Layout>
  );
}

export default App;
