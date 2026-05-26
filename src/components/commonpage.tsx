import logo from '../assets/logo.png';
import './commonpage.css';
import { Discover } from './discover';

export function Complete(){ //<>    
    return (
        <>
        <div className="container">
            <div className="top">
                <div className="horizontal">    
                    <img src={logo} alt="ProjectLogo" width="32px" height="32px"/>
                    <h3 className="tt">Project</h3>
                </div>
                <Discover />
                <h3 className="tt bc2 bc3h">Settings</h3>
            </div>

            <div className="selection horizontal bc2">
                <h4 className="tt tt2 bc3h">Mods</h4>
                <h4 className="tt tt2 bc3h">Resource Packs</h4>
                <h4 className="tt tt2 bc3h">Data Packs</h4>
                <h4 className="tt tt2 bc3h">Shaders</h4>
                <h4 className="tt tt2 bc3h">Plugins</h4>
                <h4 className="tt tt2 bc3h">Servers</h4>    
            </div>

        </div>
        </>
    );
}