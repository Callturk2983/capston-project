import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormField] = useState(defaultFormField);
  const { email, password } = formFields;


  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);

      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
