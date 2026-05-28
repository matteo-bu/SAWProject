import { Top } from "./top";
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, provider, db } from "../firebase/config";
import "./profile.css";

export function Profile(){

    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [user, setUser] = useState<User | null>(null);
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);
    
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.log(err);
        }
      };
    
      const loginWithGoogle = async () => {
        try {
          await signInWithPopup(auth, provider);
        } catch (err) {
          console.log(err);
        }
      };
    
      const register = async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (err) {
        console.log(err);
      }
      };
    
      const logout = async () => {
        await signOut(auth);
      };

    return (
        <>
            <div className="container">
                <Top/>
                <div className="center vertical">
                    <h1 className="emailpasswordwords tc1">Sign In With</h1>
                    <h2 className="tc2 tt bc2 bc3h">Google</h2>
                    <h1 className="emailpasswordwords tc1">Or Use</h1>
                    <input type="text" className="emailpassword" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="emailpassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
        </>
    );
}