// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import get from 'lodash/get';

export const loginWithProviderApi = async (providerName) => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the provider.
  const provider = new firebase.auth[providerName]();

  // Sign in with a popup.
  const result = await auth.signInWithPopup(provider);

  return result;
};

export const loginApi = async (credentials) => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Only send email and password.
  const email = get(credentials, 'email');
  const password = get(credentials, 'password');

  // Attempt to sign in.
  await auth.signInWithEmailAndPassword(email, password);
};

export const logoutApi = () => firebase.auth().signOut();

export const sendEmailVerificationApi = async () => {
  // Derive the firebase function.
  const onSendWelcomeEmail = firebase.functions().httpsCallable('onSendWelcomeEmail');

  // Attempt to send the welcome email.
  await onSendWelcomeEmail();
};

export const sendPasswordResetEmailApi = async (email, actionCodeSettings) => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Send the password reset email.
  await auth.sendPasswordResetEmail(email, actionCodeSettings);
};
