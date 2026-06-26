import { useNavigate } from "react-router";
import { Top } from "./top";
import "./main.css";
import logo from '../assets/logo.png';
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
    
    return (
        <div className="container">
            <Top/>
            <div className="center vertical">
                {visible?<h1 className="tt tc1 bc2 bc3h" style={{marginBottom:"20px"}} onClick={handleInstall}>Install App</h1>:null}
                <img src={logo} alt="ProjectLogo" width="256px" height="256px"/>
                <h1 className="tc1">Welcome to the Main Page</h1>
                <p className="tc2" style={{ fontSize: '30px' }}>Start Discovering Mods</p>
                <button className="mainbutton" onClick={() => navigate("/discover/mods")}>Discover Mods</button>
            </div>
        </div>
    );
}