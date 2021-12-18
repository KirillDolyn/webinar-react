import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import BasketSimple from "../basket-simple";

function ItemInfo() {
  const [deta, setData] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    console.log(useParams);

    const getResurs = async () => {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const data = await response.json();

      setData(data.result);
    };
    getResurs();
  }, []);

  return (
    <div className="Layout">
      <div className="Layout__head">
        <h1>{deta.name}</h1>
      </div>

      <BasketSimple />
      <div className="item__info">
        <p>Описание товара: {deta.description}</p>
        <p>Категория: {deta.title}</p>

        <p>Страна производитель </p>
        <p>Год выпуска: {deta.edition}</p>
        <span className="total__basket">Цена: {deta.price}</span>
      </div>
    </div>
  );
}

export default React.memo(ItemInfo);
