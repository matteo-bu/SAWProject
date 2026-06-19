import type { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, runTransaction } from "@firebase/firestore";

export const UserContext = createContext<{ user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> } | undefined>(undefined);

export function getData(uid: string){

    const userRef = doc(db, "users", uid);
    
    async function getName(): Promise<string | undefined> {
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
            console.log("User document does not exist");
            return;
        }
        return snap.data().name;
    }   

    async function getProgressionNumber(): Promise<number | undefined>  {

        const number = await runTransaction(db, async (transaction) => {
            const snap = await transaction.get(userRef);
        
            if (!snap.exists()) {
                console.log("User document does not exist");
                return;
            }
        
            const currentNumber = snap.data().progressionnumber;
            const newNumber = currentNumber + 1;
            transaction.update(userRef, { progressionnumber: newNumber });
            return newNumber;
            });

        return number;
    }

    return { getName, getProgressionNumber };
    
}