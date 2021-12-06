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
  const [modal, setModal] = React.useState(false);

  const basket = store.getState().basket;

  const basketCount = basket.length;
  const basketPrice = basket.reduce((a, c) => a + c.price * c.quantity, 0);

  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    onDeleteItem: useCallback((code) => store.deleteItem(code), [store]),
  };

  const onAddCart = (item) => {
    store.basketAddItem(item);
  };

  const onClickCart = () => {
    setModal(true);
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        basketCount={basketCount}
        basketPrice={basketPrice}
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
          basket={basket}
          basketCount={basketCount}
          basketPrice={basketPrice}
          onCloseCart={() => setModal(false)}
        />
      )}
    </Layout>
  );
}

export default App;
