import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser,
  signOut,
} from "firebase/auth";
import auth from "../firebase";

// @ts-ignore
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const emailVerify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };
  const removeUser = () => {
    return deleteUser(auth.currentUser);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // @ts-ignore
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        resetPassword,
        signup,
        login,
        updateUserPassword,
        emailVerify,
        removeUser,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
