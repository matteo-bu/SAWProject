const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require("./firebase-key.json");
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//const vapidKeys = webpush.generateVAPIDKeys();
const keyPublic = 'BB6IaVb69g0_qcFGLfqVWgypxAr_u4CMkYdoxv_zjPKlfTf1tDqC-9CtwYUCpplM4ac-2NEbK1jf7RPw9Z2u4tg';
const keyPrivate = '-V1xmyLtS2U0wrtyZirT7C6MpIfvocOASIF5FmDT114';
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  keyPublic,//vapidKeys.publicKey,
  keyPrivate//vapidKeys.privateKey
);

console.log("Public Key for index.html:", keyPublic);

app.get('/vapidPublicKey', (req, res) => {
  res.send(keyPublic);
});

// 2. In-memory storage for subscribers
let subscribers = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  console.log(subscription);
  
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

app.listen(3000, () => console.log('Server running on port 3000'));