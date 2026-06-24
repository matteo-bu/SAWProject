import { useNavigate } from 'react-router';
import logo from '../assets/logo.png';
import { Discover } from './discover';
import './top.css';

export function Top(){
    
    const navigator = useNavigate();

    return (
        <>
            <div className="top tc1">
                <div className="horizontal" onClick={() => navigator("/")}>    
                    <img src={logo} alt="ProjectLogo" width="32px" height="32px" style={{cursor: 'pointer'}}/>
                    <h3 className="tt">Project</h3>
                </div>
                <h3 className="tt bc2 bc3h" onClick={() => window.location.reload()}>Refresh Page</h3>
                <Discover />
                <h3 className="tt bc2 bc3h" onClick={() => navigator("/profile")}>Profile</h3>
            </div>
        </>
    );
}