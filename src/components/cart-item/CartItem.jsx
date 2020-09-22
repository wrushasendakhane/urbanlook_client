import React from "react";
import classes from "./CartItem.module.css";

function CartItem({ item: { imageUrl, name, price, quantity } }) {
  return (
    <div className={classes.container}>
      <img src={imageUrl} alt="item"></img>
      <div className={classes.itemDetails}>
        <span className={classes.name}>{name}</span>
        <span className={classes.price}>
          {quantity}x${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
