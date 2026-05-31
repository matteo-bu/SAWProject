import { Top } from "./top";
import { useEffect, useRef, useState } from "react";
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
import { doc, getDoc, setDoc } from "@firebase/firestore";

export function Profile(){

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [user, setUser] = useState<User | null>(null);

      const newname = useRef<HTMLInputElement>(null);
      const [name, setName] = useState("");
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);
    
      const loginWithGoogle = async () => {
        try {
          const credential = await signInWithPopup(auth, provider);
          await userInit(credential.user.uid);
        } catch (err) {
          console.log(err);
        }
      };
    
      const register = async () => {
        try {
        const credential =await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await userInit(credential.user.uid);

        } catch (err) {
        console.log(err);
        }
      };

      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.log(err);
        }
      };
    
      const logout = async () => {
        await signOut(auth);
      };

      const userInit = async (uid: string) => {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          await setDoc(userRef, {
          name: "exampleName",
          progressionnumber: 1
          });
        } 
      };

      const saveName = async () => {
        if (!user) return;
        const name = newname.current!.value.trim();

        try {
          await setDoc(doc(db, "users", user.uid), {
            name: name
          },
          { merge: true });
          setName(name);
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
        const loadName = async () => {
          const currentUser = auth.currentUser;
          if (!currentUser) return;

          const snap = await getDoc(doc(db, "users", currentUser.uid));

          if (snap.exists()) {
            setName(snap.data().name);
            }
        };

        loadName();
      }, [user]);

    return (
        <>
            <div className="container">
                <Top/>
                  {!user ? <div className="center vertical">
                      <h1 className="emailpasswordwords tc1">Sign In With</h1>
                      <h2 className="tc2 tt bc2 bc3h" onClick={loginWithGoogle}>Google</h2>

                      <h1 className="emailpasswordwords tc1">Or Use</h1>
                      <input type="text" className="emailpassword" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <input type="password" className="emailpassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      <h2 className="tc2 tt bc2 bc3h" onClick={login}>Sign In</h2>
                      <h2 className="tc2 tt bc2 bc3h" onClick={register} style={{ marginTop: "10px" }}>
                          Register
                      </h2>
                    </div> 
                    :
                    <> 
                      <div className="begin tc1" style={{ marginTop: "20px" }}>
                        <div className="horizontal">
                          <h3 className="tt bc2 bc3h">New Project</h3>
                          <h3 className="tt bc2 bc3h" style={{ marginLeft: "10px" }}>New Server</h3>
                        </div>
                        <h3 className="tt bc2 bc3h" onClick={logout}>Sign Out</h3>
                      </div>
                      <hr className="hr20" />

                      <div className="begin tc1">
                        <div className="horizontal">
                          <input type="text" className="newname" placeholder="New Name" maxLength={20} ref={newname}/>
                          <h3 className="tt bc2 bc3h" style={{ marginLeft: "10px" }} onClick={saveName}>
                            Save New Name
                          </h3>
                        </div>
                        <div className="horizontal">
                          <h3 className="tt bc2 bc3h">Current Name: {name}</h3>
                        </div>
                      </div>
                      <hr className="hr20" />

                    </>}
                
            </div>
        </>
    );
}