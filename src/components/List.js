import React from "react";
import { ListItem } from "./ListItem";

export function List({ store }) {
  return (
    <div className="List">
      {store.getState().items.map((item) => (
        <ListItem item={item} store={store} />
      ))}
    </div>
  );
}
