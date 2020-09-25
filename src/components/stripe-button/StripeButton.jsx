import React from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "../../assets/logo.svg";
import { checkoutStart } from "../../redux/checkout/checkoutActions";
import { connect } from "react-redux";

function StripeButton({ price, checkoutStart }) {
  const priceForStripe = price * 100;

  const onToken = (token) => {
    const stripeData = {
      amount: priceForStripe,
      token,
    };
    checkoutStart(stripeData);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Urban Look Clothing Inc"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      image={logo}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    />
  );
}

const mapDispatchToProps = (dispatch) => ({
  checkoutStart: (stripeData) => dispatch(checkoutStart(stripeData)),
});
export default connect(null, mapDispatchToProps)(StripeButton);
