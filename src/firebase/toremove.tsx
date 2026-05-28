import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import type { User } from "firebase/auth";
import { auth, provider, db } from "./config";

function App() {
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

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [savedData, setSavedData] = useState<{ nome?: string; cognome?: string } | null>(null);

  const saveUserData = async () => {
  if (!user) return;

  try {
    await setDoc(doc(db, "users", user.uid), {
      nome,
      cognome,
    });
  } catch (err) {
    console.log(err);
  }
  };

  const loadUserData = async () => {
  if (!user) return;

  try {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setSavedData(snap.data() as any);
    } else {
      setSavedData(null);
    }
  } catch (err) {
    console.log(err);
  }
  };

  const [usersList, setUsersList] = useState<any[]>([]);

  const loadAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setUsersList(users);
  } catch (err) {
    console.log(err);
  }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>

      <button onClick={login}>Login</button>

      <button onClick={loginWithGoogle}>
        Login with Google
      </button>

      <button onClick={logout}>Logout</button>

      <p>
        {user ? JSON.stringify(user, null, 2) : "Non loggato"}
      </p>
      <input
  type="text"
  placeholder="nome"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
  />

  <input
  type="text"
  placeholder="cognome"
  value={cognome}
  onChange={(e) => setCognome(e.target.value)}
  />

  <button onClick={saveUserData}>Salva dati</button>
  <button onClick={loadUserData}>Carica dati</button>

    <div>
  {savedData?.nome || savedData?.cognome ? (
    <p>
      Nome: {savedData?.nome ?? ""} <br />
      Cognome: {savedData?.cognome ?? ""}
    </p>
  ) : (
    <p>Nessun dato salvato</p>
  )}
  </div>
  <button onClick={loadAllUsers}>
  Carica tutti gli utenti
  </button>

  <div style={{ marginTop: "20px" }}>
  <h3>Utenti registrati</h3>

  {usersList.map((u) => (
    <p key={u.id}>
      {u.id}: {u.nome} {u.cognome}
    </p>
  ))}
  </div>
    </div>
    
  );
}

export default App;