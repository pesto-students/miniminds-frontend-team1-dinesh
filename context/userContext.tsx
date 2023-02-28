import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase } from "../config/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Router from "next/router";
import { checkUser, createUser, getUser } from "@/config/database";
import { UserType } from "@/utils/types";

const authContext = createContext<{
  user: any;
  loading: boolean;
  signinWithGoogle: any;
  signout: any;
} | null>(null);

const provider = new GoogleAuthProvider();

export function AuthProvider({ children }: any) {
  const auth: {
    user: any;
    loading: boolean;
    signinWithGoogle: any;
    signout: any;
  } = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<any>(null);
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
    try {
      const response = await signInWithPopup(auth, provider);
      await handleUser(response.user);
      if (redirect) {
        Router.push(redirect);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const signout = async () => {
    await auth.signOut();
    return await handleUser(false);
  };

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
