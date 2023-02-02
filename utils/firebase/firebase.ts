import { app } from "./config";
import { v4 as uid } from "uuid";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  applyActionCode,
  checkActionCode,
} from "firebase/auth";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export { onAuthStateChanged } from "firebase/auth";

export const login = async ({
  password,
  email,
}: {
  password: string;
  email: string;
}): Promise<{ name: string; email: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      resolve({
        name: res?.user?.displayName,
        email: res?.user?.email,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<{ name: string; email: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res?.user, { displayName: name });

      resolve({
        name,
        email,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const logoutUser = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      signOut(auth);
      resolve("successfull");
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUserPassword = async ({
  email,
  oldPassword,
  newPassword,
}: {
  email: string;
  oldPassword: string;
  newPassword: string;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, oldPassword);
      await updatePassword(user?.user, newPassword);
      resolve("user updated.");
    } catch (err) {
      reject(err);
    }
  });
};

export const authWithGoogle = (): Promise<{ email: string; name: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(res);
      const user = res.user;
      resolve({
        email: user.email,
        name: user?.displayName,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const uploadImage = async (image: any) => {
  const res = await fetch(image);
  const blob = await res.blob();

  const createRef = ref(storage, `/images/${uid()}`);
  const uploadTask = uploadBytesResumable(createRef, blob);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        reject(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURI) => {
          resolve(downloadURI);
        });
      }
    );
  });
};
