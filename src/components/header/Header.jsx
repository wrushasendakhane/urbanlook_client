import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import classes from "./Header.module.css";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";
import { selectCurrentUser } from "../../redux/user/userSelectors";
import { selectCartHidden } from "../../redux/cart/cartSelectors";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/userActions";
function Header({ currentUser, hidden, signOutStart }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="nav-brand">
        <img
          src={logo}
          alt="Urban Look"
          style={{ height: "50px", width: "50px" }}
        />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav ml-auto">
          <Link
            to="/shop"
            className="nav-item nav-link"
            onClick={handleNavCollapse}
          >
            SHOP
          </Link>

          {currentUser ? (
            <Fragment>
              <Link
                to="/orders"
                className="nav-item nav-link"
                onClick={handleNavCollapse}
              >
                ORDERS
              </Link>
              <div
                className="nav-item nav-link"
                style={{ cursor: "pointer" }}
                onClick={signOutStart}
              >
                SIGN OUT
              </div>
            </Fragment>
          ) : (
            <Link
              to="/signin"
              className="nav-item nav-link"
              onClick={handleNavCollapse}
            >
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      {hidden ? null : <CartDropdown />}
    </nav>
  );
}

// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state),
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
