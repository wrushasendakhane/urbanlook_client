import React, { useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import HomePage from './containers/homepage/HomePage';
import ShopPage from './containers/shop/ShopPage';
import CheckoutPage from './containers/checkout/CheckoutPage';
import SignInAndSignUpPage from './containers/sign-in-and-sign-up/SignInAndSignUpPage';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/userSelectors';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/userActions';
import OrdersPage from './containers/orders/OrdersPage';
import { fetchSectionsStart } from './redux/directory/directoryActions';

function App({ currentUser, checkUserSession, fetchSectionsStart }) {
  useEffect(() => {
    checkUserSession();
    fetchSectionsStart();
    return () => {
    }
  }, [])
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin"
          render={() => currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />}
        />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/orders" component={OrdersPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>

  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchSectionsStart: () => dispatch(fetchSectionsStart())

})
export default connect(mapStateToProps, mapDispatchToProps)(App);
