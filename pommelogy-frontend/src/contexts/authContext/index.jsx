import React, { useContext, useState, useEffect } from "react";
//import { auth } from "../../firebase/firebase"; // Make sure this imports the correct initialization method from Firebase
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import named exports from firebase/auth

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authInstance = getAuth();

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user && user.emailVerified) {
        setCurrentUser(user);
      } else {
        await signOut(authInstance);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
