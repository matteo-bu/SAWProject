import { Top } from "./top";

export function UserLoading(){

    return(
        <>
            <div className="container">
                <Top/>
                <div className="tc1" style={{textAlign: "center"}}>
                    <h1>Loading</h1>
                </div>
            </div>
        </>
    )

}