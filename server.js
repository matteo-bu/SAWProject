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

app.post('/subscribe', async (req, res) => {
  const subscription = req.body;
  
  //trasformo endpoint in dati binari e poi in stringa
  const docId = Buffer.from(subscription.endpoint).toString('base64');

  try {
    await db.collection('subscribers').doc(docId).set(subscription);
    console.log(`Nuovo utente salvato, Endpoint: ${subscription.endpoint}`);
    res.status(201).json({});
  } catch (err) {
    console.error("Errore durante il salvataggio dell'iscritto:", err);
    res.status(500).json({ error: "Errore interno" });
  }

});

let trueStart = false;

// cambiamenti sulla collezione "projects"
db.collection('projects').onSnapshot((snapshot) => {

  if (!trueStart) {
    trueStart = true;
    return;
  }

  // quando viene creato un documento
  snapshot.docChanges().forEach(async (change) => {
    
    if (change.type === 'added') {

      const nuovoProgetto = change.doc.data();
      const nomeProgetto = nuovoProgetto.name;

      const payload = JSON.stringify({ 
        title: 'Nuovo Progetto Creato!', 
        body: `È stato aggiunto il progetto: ${nomeProgetto}` 
      });

      const snap = await db.collection('subscribers').get();
        
      if (snap.empty) {
        console.log("Nessun utente iscritto");
        return;
      }

      // invia la notifica a tutti
      snap.forEach((doc) => {
        const sub = doc.data();

        webpush.sendNotification(sub, payload).catch( async(err) => {
          console.error("Error sending or expired subscription:", err.statusCode);
          if (err.statusCode === 410 || err.statusCode === 404) {
            await db.collection('subscribers').doc(doc.id).delete();
            console.log(`Iscrizione obsoleta rimossa da Firestore: ${doc.id}`);
          }
        });
      });
    }
  });
}, (error) => {
  console.error("Errore: " + error);
});

app.listen(3000, () => console.log('Server running on port 3000'));