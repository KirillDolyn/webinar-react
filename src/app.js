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

  const basket = cartItems.reduce((prev, obj) => obj.price + prev, 0);
  const result = cartItems.reduce((res, item) => item.quantity + res, 0);
  const product = cartItems.reduce((prev) => prev + 1, 0);

  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    // onDeleteItem: useCallback((code) => store.deleteItem(code), [store]),
  };
  const onAddCart = (code) => {
    setCartItems((prev) => {
      const isItemExist = prev.find((el) => el.code === code.code);
      if (isItemExist) {
        return prev.map((el) => {
          if (el.code === code.code) el.quantity += 1;
          return el;
        });
      } else {
        return [...prev, code];
      }
    });
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

        // onCreate={callbacks.onCreateItem}
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
          // isItemExist={isItemExist}
          // setCartItems={setCartItems}
          onCloseCart={() => setModal(false)}
        />
      )}
    </Layout>
  );
}

export default App;
