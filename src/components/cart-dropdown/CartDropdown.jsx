import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cartSelectors";
import CartItem from "../cart-item/CartItem";
import CustomButton from "../custom-button/CustomButton";
import classes from "./CartDropdown.module.css";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cartActions";
function CartDropdown({ cartItems, history, toggleCartHidden }) {
  return (
    <div className={classes.container}>
      <div className={classes.cartItems}>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="m-auto">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          toggleCartHidden();
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   cartItems: selectCartItems(state),
// });

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
