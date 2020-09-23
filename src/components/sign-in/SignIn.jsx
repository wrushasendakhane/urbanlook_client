import React, { useState } from "react";
import classes from "./SignIn.module.css";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/userActions";
import { connect } from "react-redux";

function SignIn({ googleSignInStart, emailSignInStart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <br />
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          label="Email"
          name="email"
          value={email}
          handleChange={handleChange}
          required
        />

        <FormInput
          type="password"
          label="Password"
          name="password"
          value={password}
          handleChange={handleChange}
          required
        />
        <div className="d-flex justify-content-between">
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton
            type="button"
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
