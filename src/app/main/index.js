import React, { useCallback, useEffect, useState } from "react";

import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/list/Pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPage] = useState(10);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load();
  }, []);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  const lastProductIndex = currentPage * productPage;
  const firstProductIndex = lastProductIndex - productPage;
  const currentProduct = select.items.slice(firstProductIndex, lastProductIndex);

  const paginat = (numberPage) => setCurrentPage(numberPage);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      <List items={currentProduct} renderItem={renders.item}></List>
      <Pagination productPage={productPage} totalProduct={select.items.length} paginat={paginat} />
    </Layout>
  );
}

export default React.memo(Main);
