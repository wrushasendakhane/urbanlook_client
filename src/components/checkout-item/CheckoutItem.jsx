import React from "react";
import { connect } from "react-redux";
import {
  addItem,
  clearItemFromCart,
  removeItem,
} from "../../redux/cart/cartActions";
import classes from "./CheckoutItem.module.css";
function CheckoutItem({ item, clearItem, addItem, removeItem }) {
  const { name, imageUrl, quantity, price } = item;
  return (
    <tr>
      <td>
        <div className={classes.imageContainer}>
          <img src={imageUrl} alt="item" />
        </div>
      </td>
      <td className="align-middle">
        <span className={classes.name}>{name}</span>
      </td>
      <td className="align-middle">
        <span className={classes.quantity}>
          <div className={classes.arrow} onClick={() => removeItem(item)}>
            &#10094;
          </div>
          <span className={classes.value}>{quantity}</span>
          <div className={classes.arrow} onClick={() => addItem(item)}>
            &#10095;
          </div>
        </span>
      </td>
      <td className="align-middle">
        <span className={classes.price}>${price}</span>
      </td>
      <td className="align-middle">
        <div className={classes.removeButton} onClick={() => clearItem(item)}>
          &#10005;
        </div>
      </td>
    </tr>
  );
}
const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
