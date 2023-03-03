import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase } from "../config/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Router from "next/router";
import { checkUser, createUser, getUser } from "@/utils/database";
import { UserType } from "@/utils/types";
import { useLocalStorage } from "usehooks-ts";
import { FirebaseError } from "firebase/app";

const authContext = createContext<{
  user: any;
  loading: boolean;
  signinWithGoogle: any;
  signout: any;
  createUserwithEmail: any;
  signInWithEmailPassword: any;
} | null>(null);

const provider = new GoogleAuthProvider();

export function AuthProvider({ children }: any) {
  const auth: {
    user: any;
    loading: boolean;
    signinWithGoogle: any;
    signout: any;
    createUserwithEmail: any;
    signInWithEmailPassword: any;
  } = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useLocalStorage<UserType | null>("user", null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const res = await checkUser(user.uid);
      if (res) {
        await createUser(user.uid, user);
        const data = await getUser(user.uid);
        setUser({
          email: data?.email,
          name: data?.name,
          photoUrl: data?.photoUrl,
          provider: data?.provider,
          uid: data?.uid,
        });
      } else {
        const data = await getUser(user.uid);
        setUser({
          email: data?.email,
          name: data?.name,
          photoUrl: data?.photoUrl,
          provider: data?.provider,
          uid: data?.uid,
        });
      }
      setLoading(false);
      return user;
    } else {
      setLoading(false);
      setUser(null);
      return false;
    }
  };

  const signinWithGoogle = async (redirect?: string) => {
    setLoading(true);

    return await signInWithPopup(auth, provider)
      .then(async (response) => {
        await handleUser(response.user);
        if (redirect) {
          Router.push(redirect);
        }
        setLoading(false);
      })
      .catch((err: FirebaseError) => {
        setLoading(false);
        return err;
      });
  };

  const signInWithEmailPassword = async (
    email: string,
    password: string,
    redirect?: string
  ) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        if (!response?.user) {
          return response;
        }
        await handleUser(response?.user);
        if (redirect) {
          Router.push(redirect);
        }
        setLoading(false);
      })
      .catch((err: FirebaseError) => {
        setLoading(false);
        return err;
      });
  };

  const createUserwithEmail = async (
    email: string,
    password: string,
    redirect?: string
  ) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (!response?.user) {
        return response;
      }
      await handleUser(response.user);
      if (redirect) {
        Router.push(redirect);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const signout = async () => {
    await auth.signOut();
    return await handleUser(false);
  };

  useEffect(() => {
    if (!user) {
      Router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
    signInWithEmailPassword,
    createUserwithEmail,
  };
}

const formatUser = (user: any) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
