import { useNavigate } from "react-router";
import { Top } from "./top";
import "./main.css";
import { useEffect, useRef, useState } from "react";

export function Main() {

    const navigate = useNavigate();
    const install = useRef<any>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            install.current = e;
            setVisible(true);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    async function handleInstall(){

        if (!install.current) return;
        install.current.prompt();
        await install.current.userChoice;

        install.current = null;
        setVisible(false);
    };

    if (Notification.permission !== 'granted') {
            Notification.requestPermission()
                .then((permission) => {
                    console.log('Promise resolved: ' + permission);
                })
                .catch((error) => {
                    console.log('Promise was rejected');
                    console.log(error);
                });
        }


        
        async function subscribeUser() {
  // 1. Chiedi esplicitamente il permesso all'utente (OBBLIGATORIO)
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('Permesso per le notifiche negato!');
    return;
  }

  try {
    // 2. Recupera la chiave pubblica dinamica dal server (Porta 3000)
    const publicVapidKey = await fetch('http://localhost:3000/vapidPublicKey').then(res => res.text());
    console.log('Public VAPID Key ricevuta:', publicVapidKey);

    // 3. Usa il Service Worker già pronto invece di registrarne uno nuovo
    const register = await navigator.serviceWorker.ready;

    // 4. Pulisci la vecchia sottoscrizione se esisteva
    const prevSubscription = await register.pushManager.getSubscription();
    if (prevSubscription) {
      await prevSubscription.unsubscribe();
      console.log('Rimossa vecchia sottoscrizione');
    }

    // 5. Iscrivi il browser alle notifiche usando la chiave del server
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey,
    });

    // 6. Invia la sottoscrizione al server sulla porta 3000
    await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'content-type': 'application/json' }
    });
    
    alert('Iscritto con successo! Riceverai una notifica ogni 3 secondi.');
    console.log('Sottoscrizione inviata con successo!');

  } catch (err) {
    console.error('Errore durante la sottoscrizione:', err);
  }
}
    
    return (
        <div className="container">
            <Top/>
            <div className="center vertical">
                {visible?<h1 className="tt tc1 bc2 bc3h" onClick={handleInstall}>Install App</h1>:null}
                <h1 className="tc1">Welcome to the Main Page</h1>
                <p className="tc2" style={{ fontSize: '30px' }} onClick={subscribeUser}>Start Discovering Mods</p>
                <button className="mainbutton" onClick={() => navigate("/discover/mods")}>Discover Mods</button>
            </div>
        </div>
    );
}