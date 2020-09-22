import React, { useState } from "react";
import classes from "./SignIn.module.css";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error signing in user", error.message);
    }
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
          <CustomButton type="button" isGoogleSignIn onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
