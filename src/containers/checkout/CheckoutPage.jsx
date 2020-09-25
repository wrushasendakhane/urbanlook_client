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
import { selectError } from "../../redux/checkout/checkoutSelectors";
import { Redirect } from "react-router-dom";

const CheckoutPage = ({ cartItems, total, error }) => {
  return (
    <Fragment>
      {cartItems?.length === 0 && <Redirect to="/orders" />}
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
        <div className="d-flex">
          <div className={classes.total}>TOTAL:${total}</div>
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
        </div>
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
  error: selectError,
});
export default connect(mapStateToProps)(CheckoutPage);
