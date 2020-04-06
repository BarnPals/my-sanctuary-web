// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/auth';
import get from 'lodash/get';

export const registerApi = async (user) => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Only send email and password.
  const email = get(user, 'email');
  const password = get(user, 'password');
  const displayName = get(user, 'displayName');

  // Create the current user.
  await auth.createUserWithEmailAndPassword(email, password);

  // Update the display name and photoUri.
  await auth.currentUser.updateProfile({
    displayName,
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/my-sanctuary-barnpals-website-1.appspot.com/o/public%2Fimages%2FdefaultUser.png?alt=media',
  });
};
