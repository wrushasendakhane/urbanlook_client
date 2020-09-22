import React from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "../../assets/logo.svg";

function StripeButton({ price }) {
  const priceForStripe = price * 100;

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
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
      stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
    />
  );
}

export default StripeButton;
