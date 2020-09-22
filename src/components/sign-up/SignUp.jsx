import React, { useState } from "react";
import classes from "./SignUp.module.css";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(displayName);
      await createUserProfileDocument(user, { displayName });
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "displayName":
        setDisplayName(value);
        break;
      default:
        break;
    }
  };
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>I don't have an account</h2>
      <span>Sign up with your email and password</span>
      <br />
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Display Name"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          required
        />
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
        <FormInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
}

export default SignUp;
