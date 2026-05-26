import logo from '../assets/logo.png';
import { Environments, License, ModPluginDPCategories, Versions } from '../lists/common';
import { ModLoaders } from '../lists/mods';
import './commonpage.css';
import { Discover } from './discover';
import Filter from './filter';

export function Complete(){ //<>    
    return (
        <>
        <div className="container">
            <div className="top tc1">
                <div className="horizontal">    
                    <img src={logo} alt="ProjectLogo" width="32px" height="32px"/>
                    <h3 className="tt">Project</h3>
                </div>
                <Discover />
                <h3 className="tt bc2 bc3h">Settings</h3>
            </div>

            <div className="selection horizontal bc2 tc1">
                <h4 className="tt tt2 bc3h">Mods</h4>
                <h4 className="tt tt2 bc3h">Resource Packs</h4>
                <h4 className="tt tt2 bc3h">Data Packs</h4>
                <h4 className="tt tt2 bc3h">Shaders</h4>
                <h4 className="tt tt2 bc3h">Plugins</h4>
                <h4 className="tt tt2 bc3h">Servers</h4>    
            </div>
            
            <div className="horizontal">
                <div className="" style={{width: '20%', marginRight: '10px'}}>
                    <Filter name="Game Version" list={Versions} bar={true}/>
                    <Filter name="Loader" list={ModLoaders} bar={true} />
                    <Filter name="Category" list={ModPluginDPCategories} bar={true} />
                    <Filter name="Environment" list={Environments} bar={false} />
                    <Filter name="License" list={License} bar={false} />
                </div>

                <div className="vertical">
                    
                </div>
            </div>
            

        </div>
        </>
    );
}