import db from "..";
import { doc, getDoc, setDoc, deleteDoc,collection, query, where, getDocs } from 'firebase/firestore';
import { UserData } from 'types';
const COLLECTION_NAME = "users";
export const getLoggedInUser = async (user: { uid: string; firstName: string; email: string; photoURL: any; lastName: string; displayname: string; age: number}): Promise<UserData> => {
    const docRef = doc(db, COLLECTION_NAME, user.uid);
    const docSnap = await getDoc(docRef);
console.log(docSnap + ' docSnap');
    if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data() as UserData;
    } else {
        // add doc
        try {
            await setDoc(doc(db, COLLECTION_NAME, user.uid), {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                photoURL: user.photoURL,
                gender: null,
                age: user.age,
                interests: [],
            });
        } catch (e) {
            // need to handle error case.
            return null as UserData;
        }
        const newDocSnap = await getDoc(docRef);
        return newDocSnap.data() as UserData;
    }
    
}
export const deleteUser = async (uid: any) => {
    const docRef = doc(db, COLLECTION_NAME, uid);
    await deleteDoc(docRef);
}

export const getUserInfo = async (uid: any)=> {
    const q = query(collection(db, COLLECTION_NAME), where("interest" , "==", uid));
    const groupSnapshot = await getDocs(q);
    console.log(groupSnapshot);
}