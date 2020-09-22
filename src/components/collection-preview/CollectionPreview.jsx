import React from "react";
import CollectionItem from "../collection-item/CollectionItem";
import classes from "./CollectionPreview.module.css";

function CollectionPreview({ title, items }) {
  return (
    <div className={classes.collection_container}>
      <div className={classes.title}>{title?.toUpperCase()}</div>
      <div className={classes.preview_container}>
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default CollectionPreview;
