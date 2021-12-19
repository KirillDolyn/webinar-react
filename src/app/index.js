import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import ItemInfo from "../components/itemInfo";
import ItemBasket from "../components/item-basket";

/**
 * Приложение
 */

function App() {
  const select = useSelector((state) => ({
    name: state.modals.name,
  }));

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/items/:id" element={<ItemInfo />} />
        <Route path="/items" element={<ItemBasket />} />
      </Routes>
      {select.name === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
