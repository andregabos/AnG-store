import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import {auth, createUserProfileDocument} from "../../Firebase/firebase.utils";
import "./SignUp.styles.scss";

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const {displayName, email, password, confirmPassword} = userInfo;

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, {displayName});

      setUserInfo({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
      
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
        type="text"
        name="displayName"
        value={displayName}
        onChange={handleChange}
        label="Display Name"
        required
        />
        <FormInput
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        label="Email"
        required
        />
        <FormInput
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        label="Password"
        required
        />
        <FormInput
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        label="Confirm Password"
        required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  )
}

export default SignUp;