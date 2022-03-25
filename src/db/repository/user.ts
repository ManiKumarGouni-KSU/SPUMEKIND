import db from "..";
import { doc, getDoc, setDoc, updateDoc, arrayUnion  } from 'firebase/firestore';
import { UserData, UserSaveFormData } from 'types';
const COLLECTION_NAME = "users";
export const getLoggedInUser = async (user: { uid: string; firstName: string; email: string; photoURL: any; lastName: string; displayname: string; age: number}): Promise<UserData> => {
    const docRef = doc(db, COLLECTION_NAME, user.uid);
    const docSnap = await getDoc(docRef);

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
export const getLoginUser = async (uid: string): Promise<UserData> => {
    const docRef = doc(db, COLLECTION_NAME, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserData;
    } else {
        alert('user does not exist!');
        return null;
    }
}
export const addUserInterest = async (uid: string, interest: string) => {
    const docRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(docRef, {
        interests: arrayUnion(interest)
    });
}
