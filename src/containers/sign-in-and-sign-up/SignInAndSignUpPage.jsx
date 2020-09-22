import React from "react";
import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import classes from "./SignInAndSignUpPage.module.css";
const SignInAndSignUpPage = () => {
  return (
    <div className={classes.container}>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
