import { useNavigate } from "react-router";

export function Main() {

    const navigate = useNavigate();
    return (
        <>
            <h1>Welcome to the Main Page</h1>
            <p>Start Discovering</p>
            <button onClick={() => navigate("/discover/mods")}>Discover Mods</button>
        </>
    );
}