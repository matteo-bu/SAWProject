const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYCGJNw1U58FG3bjRo87RLwJcerAGZi0",
  authDomain: "saw-project-d2fad.firebaseapp.com",
  projectId: "saw-project-d2fad",
  storageBucket: "saw-project-d2fad.firebasestorage.app",
  messagingSenderId: "406220704198",
  appId: "1:406220704198:web:0ab51a2c2cf51676f88ac7",
  measurementId: "G-5NCW7HZ9DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

/*const serviceAccount = require("./firebase-key.json");
initializeApp({
  credential: cert(serviceAccount)
});*/

//const db = getFirestore();
const apps = express();
apps.use(cors());
apps.use(bodyParser.json());

// 1. VAPID Keys (Generate once and reuse)
const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

console.log("Public Key for index.html:", vapidKeys.publicKey);

apps.get('/vapidPublicKey', (req, res) => {
  res.send(vapidKeys.publicKey);
});

// 2. In-memory storage for subscribers
let subscribers = [];

apps.post('/subscribe', (req, res) => {
  const subscription = req.body;
  
  // Add the new subscription to our list
  subscribers.push(subscription);
  
  console.log("New user subscribed. Total subscribers:", subscribers.length);
  res.status(201).json({});
});


let serverPronto = false;

// Ascolta i cambiamenti sulla collezione "projects" in tempo reale
db.collection('projects').onSnapshot((snapshot) => {
  // Gestisce l'attivazione iniziale per non notificare i progetti storici già presenti
  if (!serverPronto) {
    serverPronto = true;
    console.log("Firestore Listener attivo sulla collezione 'projects'. Server pronto!");
    return;
  }

  // Intercetta i cambiamenti della collezione
  snapshot.docChanges().forEach((change) => {
    // Ci interessa SOLO quando viene CREATO un nuovo documento (nuovo progetto)
    if (change.type === 'added') {
      if (subscribers.length === 0) return;

      const nuovoProgetto = change.doc.data();
      const nomeProgetto = nuovoProgetto.name;

      const payload = JSON.stringify({ 
        title: 'Nuovo Progetto Creato!', 
        body: `È stato aggiunto il progetto: ${nomeProgetto}` 
      });

      console.log(`Firestore: Rilevato nuovo progetto! Invio push a ${subscribers.length} utenti...`);

      // Invia la notifica a tutti
      subscribers.forEach((sub, index) => {
        webpush.sendNotification(sub, payload).catch(err => {
          console.error("Error sending or expired subscription:", err.statusCode);
          if (err.statusCode === 410 || err.statusCode === 404) {
            subscribers.splice(index, 1);
          }
        });
      });
    }
  });
}, (error) => {
  console.error("Errore nell'ascolto di Firestore:", error);
});

apps.listen(3000, () => console.log('Server running on port 3000'));