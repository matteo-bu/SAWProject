import { Environments, License, ModPluginDPCategories, Versions } from '../lists/common';
import { ModLoaders } from '../lists/mods';
import './commonpage.css';
import Filter from './filter';
import { Top } from './top';
import { Selection } from './selection';
import { Sort } from './sort';

export function Complete(){ //<>    

    return (
        <>
        <div className="container">
            <Top/>
            <Selection/>
            
            <div className="horizontal">
                <div className="left">
                    <Filter name="Game Version" list={Versions} bar={true}/>
                    <Filter name="Loader" list={ModLoaders} bar={true} />
                    <Filter name="Category" list={ModPluginDPCategories} bar={true} />
                    <Filter name="Environment" list={Environments} bar={false} />
                    <Filter name="License" list={License} bar={false} />
                </div>

                <div className="vertical right">
                    <input type="text" className="search" placeholder="Search..." />
                    <Sort/>
                </div>
            </div>
            

        </div>
        </>
    );
}