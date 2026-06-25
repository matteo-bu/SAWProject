import { useContext, useEffect, useState } from "react";
import { UserContext } from "../functions/user";
import { getProjectInfo } from "../functions/project";
import { getServerInfo } from "../functions/server";

export function checkUser(type: string, id: string){

    const userC = useContext(UserContext);
    if (!userC) return;
    const { user } = userC;

    const [u, setU] = useState<string | null>(null);

    async function getInfo(){

        if (type == "project"){
            const info = await getProjectInfo(id);
            if (!info) return;
            const { UserId } = info;
            setU(UserId());
        } else {
            const info = await getServerInfo(id);
            if (!info) return;
            const { UserId } = info;
            setU(UserId());
        }

    }

    useEffect(() => {
        getInfo();
    }, []);

    if (u == null) return null;
    if (user?.uid == u) return true;
    else return false;

}