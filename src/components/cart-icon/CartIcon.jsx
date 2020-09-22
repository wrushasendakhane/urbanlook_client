import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import classes from "./CartIcon.module.css";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cartActions";
import { selectCartItemsCount } from "../../redux/cart/cartSelectors";
import { createStructuredSelector } from "reselect";
function CartIcon({ toggleCartHidden, itemCount }) {
  return (
    <div className={classes.container} onClick={toggleCartHidden}>
      <ShoppingIcon className={classes.shoppingIcon} />
      <span className={classes.itemCount}>{itemCount}</span>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   itemCount: selectCartItemsCount(state),
// });

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
