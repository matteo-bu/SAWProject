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
        
    async function subscribeUser() {

        if (!("Notification" in window)) {
            alert("Notifiche non supportate");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            alert('Permesso per le notifiche negato!');
            return;
        }

        try {
            
            const publicVapidKey = await fetch('http://localhost:3000/vapidPublicKey').then(res => res.text());//'BB6IaVb69g0_qcFGLfqVWgypxAr_u4CMkYdoxv_zjPKlfTf1tDqC-9CtwYUCpplM4ac-2NEbK1jf7RPw9Z2u4tg';
            console.log('Chiave pubblica VAPID ricevuta dal server: ' + publicVapidKey);

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
            
            alert('Iscritto con successo! Riceverai una notifica ogni volta che viene aggiunto un nuovo progetto!');
            console.log('Sottoscrizione inviata con successo!');

        } catch (err) {
            console.error('Errore ' + err);
            alert("Qualcosa è andato storto: " + err);
        }
    }
    
    return (
        <div className="container">
            <Top/>
            <div className="center vertical">
                <h3 className="tt tc1 bc2 bc3h" onClick={subscribeUser}>Subscribe to Notifications</h3>
                {visible?<h1 className="tt tc1 bc2 bc3h pmt10" onClick={handleInstall}>Install App</h1>:null}
                <h1 className="tc1">Welcome to the Main Page</h1>
                <p className="tc2" style={{ fontSize: '30px' }}>Start Discovering Mods</p>
                <button className="mainbutton" onClick={() => navigate("/discover/mods")}>Discover Mods</button>
            </div>
        </div>
    );
}