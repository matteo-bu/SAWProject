import { Top } from "./top";
import { useContext, useEffect, useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, provider, db } from "../firebase/config";
import "./profile.css";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { ProjectSmall } from "./projectsmall";
import { getData, UserContext } from "../functions/user";

export function Profile(){

      const userC = useContext(UserContext);
      if (!userC) return;
      const {user, setUser} = userC;

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const newname = useRef<HTMLInputElement>(null);
      const [name, setName] = useState("");

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [dialogType, setDialogType] = useState("project");
      const [selectionOpen, setSelectionOpen] = useState(false);

      const projectName = useRef<HTMLInputElement>(null);
      const projectSummary = useRef<HTMLTextAreaElement>(null);

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
        setName("exampleName");
      };

      const userInit = async (uid: string) => {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          await setDoc(userRef, {
          name: "exampleName",
          progressionnumber: 0
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
          if (!user) return;

          const snap = await getDoc(doc(db, "users", user.uid));

          if (snap.exists()) {
            setName(snap.data().name);
            }
        };

        loadName();
      }, [user]);

      const saveProject = async () => {
        if (!user) return;

        const pname = projectName.current!.value.trim();
        const psummary = projectSummary.current!.value.trim();
        if (pname === "" || psummary === "") {
          return;
        }

        const { getProgressionNumber } = getData(user.uid);
        const number = await getProgressionNumber();

        const Ref = doc(db, dialogType+"s", user.uid + number);
        
        try {
          await setDoc(Ref, {
            userid: user.uid,
            name: pname,
            summary: psummary,
            description: "",
            tags: [],
            issuetracker: "",
            sourcecode: "",
            wikipage: "",
            discord: "",
            donation: ""
          });
        } catch (err) {
          console.log(err);
        }

        if (dialogType === "project") {
          try {
            await setDoc(Ref, {
              downloads: 0,
              files: [],
              license: "",
            },
            { merge: true });
          } catch (err) {
            console.log(err);
          }
        }

        setIsDialogOpen(false);

      }

    return (
        <>
            <div className="container">
                <Top/>
                  {!user ? <div className="center vertical">
                      <h1 className="emailpasswordwords tc1">Sign In With</h1>
                      <h2 className="tc2 tt bc2 bc3h" onClick={loginWithGoogle}>Google</h2>

                      <h1 className="emailpasswordwords tc1">Or Use</h1>
                      <input type="text" className="emailpassword" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <input type="password" className="emailpassword" placeholder="Password (6-30 characters)" maxLength={30} value={password} onChange={(e) => setPassword(e.target.value)}/>
                      <h2 className="tc2 tt bc2 bc3h" onClick={login}>Sign In</h2>
                      <h2 className="tc2 tt bc2 bc3h" onClick={register} style={{ marginTop: "10px" }}>Register</h2>
                    </div> 
                    :
                    <> 
                      <div className="begin tc1" style={{ marginTop: "20px" }}>
                        <div className="horizontal">
                          <h3 className="tt bc2 bc3h" onClick={() => {setIsDialogOpen(true); setDialogType('project')}}>New Project</h3>
                          <h3 className="tt bc2 bc3h" onClick={() => {setIsDialogOpen(true); setDialogType('server')}} style={{ marginLeft: "10px" }}>New Server</h3>
                        </div>
                        <h3 className="tt bc2 bc3h" onClick={logout}>Sign Out</h3>
                      </div>
                      <hr className="hr20" />

                      <div className="begin tc1">
                        <div className="horizontal">
                          <input type="text" className="newname" placeholder="New Name (20 characters max)" maxLength={20} ref={newname}/>
                          <h3 className="tt bc2 bc3h" style={{ marginLeft: "10px" }} onClick={saveName}>Save New Name</h3>
                        </div>
                        <div className="horizontal">
                          <h3 className="tt bc2 bc3h">Current Name: {name}</h3>
                        </div>
                      </div>
                      <hr className="hr20" />

                      <ProjectSmall type={"project"} projectid={"project1"} name={"Name"} author={"Santissimo Pino"} downloads={100} platforms={["Windows", "macOS", "Linux"]} summary={"Nel silenzio della sera, una brezza leggera attraversa il parco e porta con sé profumi lontani, ricordi gentili e nuove possibilità. ogni giorno. ora."} />

                    </>}

                    { isDialogOpen && (
                      <div className="overlaydialog" onClick={() => setIsDialogOpen(false)}>
                        <div className="dialog" onClick={(e) => e.stopPropagation()}>
                          <div className="top">
                            <h2 className="tc1">Creating a {dialogType}</h2>
                            <h2 className="tc1 tt bc3" style={{ padding: "4px 10px" }} onClick={() => setIsDialogOpen(false)}>X</h2>
                          </div>                          
                          <hr className="hr20"/>
                          <h3 className="tc1">Type</h3>
                            <div className="menu-wrapper" style={{ width: "100%", marginBottom: "10px" }}>
                              <div className="tt bc3 bc3h sort tc2 begin" onClick={() => setSelectionOpen(!selectionOpen)}>
                                  <h3>{dialogType}</h3>
                                  <h3>{selectionOpen ? '-' : '+'}</h3>
                              </div>

                              <div className={`bc2 dropdown ${selectionOpen ? "open" : ""}`}>
                                  <p className="bc3h" onClick={() => { setDialogType("project"); setSelectionOpen(false); }}>Project</p>
                                  <p className="bc3h" onClick={() => { setDialogType("server"); setSelectionOpen(false); }}>Server</p>
                              </div>
                            </div>
                          <h3 className="tc1">Name</h3>
                          <input type="text" className="bc3 tc1 input" placeholder="Enter name (50 characters max)" ref={projectName} maxLength={50} style={{ width: "97%" }}/>
                          <h3 className="tc1">Summary</h3>
                          <textarea className="bc3 tc1 input" placeholder="Write something (150 characters max)" ref={projectSummary} maxLength={150} style={{ width: "97%", resize: "none", height: "100px" }}/>
                          <h5 className="tc2" style={{ marginBottom: "10px" }}>A sentence or two describing the {dialogType}.</h5>
                          <div className="horizontal" style={{justifyContent: "flex-end" }}>
                            <h3 className="tt bc3 tc1" style={{ marginRight: "10px" }} onClick={() => setIsDialogOpen(false)}>Cancel</h3>
                            <h3 className="tt bc3 tc1" onClick={() => saveProject()}>Create {dialogType}</h3>
                          </div>
                        </div>
                      </div>
                    )}
                
            </div>
        </>
    );
}