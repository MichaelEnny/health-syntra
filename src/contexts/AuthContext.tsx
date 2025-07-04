
"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  type User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
  type AuthError
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, type Unsubscribe } from 'firebase/firestore';
import type { UserProfile } from '@/types';


interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  deleteAccount: () => Promise<{ success: boolean; message?: string }>;
  updateSubscription: (plan: 'standard' | 'premium') => Promise<{ success: boolean; message?: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to map Firebase error codes to user-friendly messages
const getFirebaseAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please login or use a different email.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use at least 6 characters.';
    case 'auth/popup-closed-by-user':
        return 'The sign-in popup was closed before completing. Please try again.';
    case 'auth/cancelled-popup-request':
        return 'Multiple sign-in requests were made. Please try again.';
    default:
      return 'An unexpected authentication error occurred. Please try again later.';
  }
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const router = useRouter();

  const isLoading = isLoadingAuth || isLoadingProfile;
  const isAuthenticated = !isLoading && currentUser !== null;

  useEffect(() => {
    let unsubscribeProfile: Unsubscribe | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoadingAuth(false);
      
      if (unsubscribeProfile) {
        unsubscribeProfile();
        setUserProfile(null);
        setIsLoadingProfile(true);
      }

      if (user) {
        setIsLoadingProfile(true);
        const userDocRef = doc(db, "users", user.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserProfile(doc.data() as UserProfile);
          } else {
            console.warn("User document not found in Firestore for UID:", user.uid);
            setUserProfile(null);
          }
          setIsLoadingProfile(false);
        }, (error) => {
           console.error("Error fetching user profile:", error);
           setIsLoadingProfile(false);
        });
      } else {
        setIsLoadingProfile(false);
        setUserProfile(null);
      }
    });

    return () => {
        unsubscribeAuth();
        if (unsubscribeProfile) {
            unsubscribeProfile();
        }
    };
  }, []);

  const register = useCallback(async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUserProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        subscriptionPlan: 'free',
      };
      await setDoc(doc(db, "users", user.uid), newUserProfile);
      
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      console.error("Registration error:", authError);
      return { success: false, message: getFirebaseAuthErrorMessage(authError) };
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError);
      return { success: false, message: getFirebaseAuthErrorMessage(authError) };
    }
  }, [router]);
  
  const loginWithGoogle = useCallback(async (): Promise<{ success: boolean; message?: string; }> => {
    const provider = new GoogleAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, provider);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const newUserProfile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            subscriptionPlan: 'free',
          };
          await setDoc(userDocRef, newUserProfile);
        }
        router.push('/dashboard');
        return { success: true };
    } catch (error) {
        const authError = error as AuthError;
        console.error("Google login error:", authError);
        return { success: false, message: getFirebaseAuthErrorMessage(authError) };
    }
  }, [router]);

  const logout = useCallback(async () => {
    await signOut(auth);
    router.push('/login');
  }, [router]);
  
  const updateSubscription = useCallback(async (plan: 'standard' | 'premium'): Promise<{ success: boolean; message?: string }> => {
    if (!currentUser) {
      return { success: false, message: "No user is logged in." };
    }
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { subscriptionPlan: plan });
      return { success: true };
    } catch (error) {
      console.error("Failed to update subscription:", error);
      return { success: false, message: "Could not update your subscription plan." };
    }
  }, [currentUser]);

  const deleteAccount = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, message: "No user logged in to delete." };
    }
    try {
      await deleteUser(user);
      // logout() will handle redirecting
      return { success: true };
    } catch (error) {
        const authError = error as AuthError;
        console.error("Delete account error:", authError);
        // This can happen if the user needs to re-authenticate
        if (authError.code === 'auth/requires-recent-login') {
            return { success: false, message: 'This is a sensitive operation. Please log out and log back in before deleting your account.' };
        }
        return { success: false, message: getFirebaseAuthErrorMessage(authError) };
    }
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    currentUser,
    userProfile,
    login,
    loginWithGoogle,
    logout,
    register,
    deleteAccount,
    updateSubscription,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
