// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import get from 'lodash/get';
import invoke from 'lodash/invoke';
import pick from 'lodash/pick';
// Externals
import { deriveIDsAndLookupFromSnapshot } from 'utils/helpers';
// Relative
import VALID_FIELDS from './VALID_FIELDS';
import { ACTIVE } from './STATUSES';
import { USER } from './ROLES';

export const createAccountApi = async () => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the current user properties.
  const currentUser = get(auth, 'currentUser');
  const displayName = get(currentUser, 'displayName');
  const email = get(currentUser, 'email');
  const emailVerified = get(currentUser, 'emailVerified');
  const id = get(currentUser, 'uid');
  const imageURL = get(currentUser, 'photoURL');
  const phoneNumber = get(currentUser, 'phoneNumber');

  // Derive the firebase db.
  const db = firebase.firestore();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive the new account.
  const newAccount = {
    createdAt: timestamp,
    displayName,
    email,
    emailVerified,
    id,
    imageURL,
    phoneNumber,
    primaryBoardID: '',
    role: USER,
    status: ACTIVE,
    updatedAt: timestamp,
  };

  // Create the snapshot.
  await db
    .collection('accounts')
    .doc(id)
    .set(newAccount);
};

// @WARNING: This code is commented out for now as it may not be desired.
export const deleteAccountApi = async (/* id */) => {
  // // Derive the firebase db.
  // const db = firebase.firestore();
  // // Delete the document.
  // await db
  //   .collection('accounts')
  //   .doc(id)
  //   .delete();
};

export const getAccountApi = async () => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the user properties.
  const currentUser = get(auth, 'currentUser');
  const accountID = get(currentUser, 'uid');
  const emailVerified = get(currentUser, 'emailVerified');

  // Escape early if there is no accountID.
  if (!accountID) {
    if (window.FS) {
      window.FS.log('warn', 'No accountID found in firebase auth.');
    }
    return;
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the account snapshot.
  const accountSnapshot = await db
    .collection('accounts')
    .doc(accountID)
    .get();

  // Return back the account object.
  const account = invoke(accountSnapshot, 'data');

  // Update the email verified state on our account.
  if (emailVerified !== get(account, 'emailVerified')) {
    await updateAccountApi({ emailVerified: true });
    return { ...account, emailVerified };
  }

  return account;
};

export const getAccountsApi = async () => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the accounts snapshot.
  const accountsSnapshot = await db
    .collection('accounts')
    .orderBy('updatedAt', 'desc')
    .get();

  return deriveIDsAndLookupFromSnapshot(accountsSnapshot.docs);
};

export const updateAccountApi = async (account) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the accountID.
  const accountID = get(auth, 'currentUser.uid');

  // Derive the imageURL.
  const imageURL = get(account, 'imageURL');

  // Attempt to upload the imageURL.
  const uploadedImageURL = await uploadImageApi(imageURL, accountID);

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from account to avoid adding unwanted kv pairs.
  const sanitizedAccount = pick(account, VALID_FIELDS);

  // Derive the updated account object.
  const updatedAccount = { ...sanitizedAccount, updatedAt: timestamp };

  // Add the uploaded imageURL if provided.
  if (uploadedImageURL) {
    updatedAccount.imageURL = uploadedImageURL;
  }

  // Update the document.
  await db
    .collection('accounts')
    .doc(accountID)
    .update(updatedAccount);

  // Get the account snapshot.
  const accountSnapshot = await db
    .collection('accounts')
    .doc(accountID)
    .get();

  // Return back the account object.
  return invoke(accountSnapshot, 'data');
};

const uploadImageApi = async (imageURL, accountID) => {
  // Escape early if there is no image URL.
  if (!imageURL) {
    return;
  }

  // Derive the firebase storage.
  const storageRef = firebase.storage().ref();

  // Derive the image ref.
  const imageRef = storageRef.child(`profileImages/${accountID}-profile.jpg`);

  // Create upload task.
  await imageRef.put(imageURL, { contentType: 'image/jpeg' });

  // Fetch the downloadURL.
  const downloadURL = await imageRef.getDownloadURL();

  // Return the downloadURL.
  return downloadURL;
};
