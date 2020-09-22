import React, { Fragment } from "react";
import classes from "./CheckoutPage.module.css";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cartSelectors";
import { connect } from "react-redux";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import StripeButton from "../../components/stripe-button/StripeButton";

const CheckoutPage = ({ cartItems, total }) => {
  return (
    // <div className={classes.checkoutPage}>
    //   <div className={classes.checkoutHeader}>
    //     <div className={classes.headerBlock}>Product</div>
    //     <div className={classes.headerBlock}>Description</div>
    //     <div className={classes.headerBlock}>Quantity</div>
    //     <div className={classes.headerBlock}>Price</div>
    //     <div className={classes.headerBlock}>Remove</div>
    //   </div>

    //   {cartItems.length ? (
    //     cartItems.map((cartItem) => (
    //       <CheckoutItem key={cartItem.id} item={cartItem} />
    //     ))
    //   ) : (
    //     <div className="row">
    //       <div className="col">Your cart is empty</div>
    //     </div>
    //   )}
    //   <div className={classes.total}>TOTAL:${total}</div>
    // </div>
    <Fragment>
      <div className="row col-10 mx-auto">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td className={classes.headerBlock}>Product</td>
                <td className={classes.headerBlock}>Description</td>
                <td className={classes.headerBlock}>Quantity</td>
                <td className={classes.headerBlock}>Price</td>
                <td className={classes.headerBlock}>Remove</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.length ? (
                cartItems.map((cartItem) => (
                  <CheckoutItem key={cartItem.id} item={cartItem} />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Your cart is empty</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={classes.total}>TOTAL:${total}</div>
      </div>
      <StripeButton price={total} />
      <div className="alert alert-warning text-center" role="alert">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: Any Future Date CVV: Any 3 digits
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});
export default connect(mapStateToProps)(CheckoutPage);
