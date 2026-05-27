import { useNavigate } from "react-router";
import { Top } from "./top";
import "./main.css";
import logo from '../assets/logo.png';

export function Main() {

    const navigate = useNavigate();
    return (
        <div className="container">
            <Top/>
            <div className="center vertical">
                <img src={logo} alt="ProjectLogo" width="256px" height="256px"/>
                <h1 className="tc1">Welcome to the Main Page</h1>
                <p className="tc2" style={{ fontSize: '30px' }}>Start Discovering Mods</p>
                <button className="mainbutton" onClick={() => navigate("/discover/mods")}>Discover Mods</button>
            </div>
        </div>
    );
}