import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import { selectError } from "../../redux/user/userSelectors";
import classes from "./SignInAndSignUpPage.module.css";
const SignInAndSignUpPage = ({ error }) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <SignIn />
        <SignUp />
      </div>
      {error && (
        <div className="alert alert-danger text-center mt-2" role="alert">
          {error.message}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
