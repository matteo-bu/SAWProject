import { useNavigate } from 'react-router';
import { Discover } from './discover';
import './top.css';

export function Top(){
    
    const navigator = useNavigate();

    return (
        <>
            <div className="top tc1">
                <div className="horizontal" onClick={() => navigator("/")}>
                    <h3 className="tt">Main Page</h3>
                </div>
                <div className="horizontal">
                    <h3 className="tt bc2 bc3h" onClick={() => window.history.back()}>←</h3>
                    <h3 className="tt bc2 bc3h pml10" onClick={() => window.location.reload()}>Refresh</h3>
                    <h3 className="tt bc2 bc3h pml10" onClick={() => window.history.forward()}>→</h3>
                </div>
                <Discover />
                <h3 className="tt bc2 bc3h" onClick={() => navigator("/profile")}>Profile</h3>
            </div>
        </>
    );
}