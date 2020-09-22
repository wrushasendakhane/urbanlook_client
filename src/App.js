import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import HomePage from './containers/homepage/HomePage';
import ShopPage from './containers/shop/ShopPage';
import CheckoutPage from './containers/checkout/CheckoutPage';
import SignInAndSignUpPage from './containers/sign-in-and-sign-up/SignInAndSignUpPage';

import { addCollectionAndDocuments, auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/userActions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/userSelectors';
import { selectCollectionForPreview } from './redux/shop/shopSelector';

function App({ currentUser, setCurrentUser/*, collectionsArray */ }) {

  useEffect(() => {
    const unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
          // addCollectionAndDocuments("collections", collectionsArray.map(({ title, items }) => ({ title, items })))
        })
      } else {
        setCurrentUser(null);
      }
    })
    return () => {
      unsubsribeFromAuth();
    }
  }, [setCurrentUser])

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin"
          render={() => currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />}
        />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>

  );
}

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser
// })
const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser,
    // collectionsArray: selectCollectionForPreview
  })
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
