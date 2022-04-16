import db from "..";
import { GroupSearchFormData, UserData, UserSearchProfiles } from 'types/index';
import { collection, query, getDocs, where } from 'firebase/firestore';
const COLLECTION_NAME = "users";
const COLLENCTION_SEARCHPROFILE_NAME = "users_search_matches";
export const getGroupsByCriteria = async (criteria: GroupSearchFormData, uid: string): Promise<UserData[]> => {
    console.log(criteria.interest + " == " + criteria.gender);
    const q = query(collection(db, COLLECTION_NAME), where("interests", "array-contains", criteria.interest), where("gender", "==", criteria.gender));
    const groupSnapshot = await getDocs(q);
    const data: Array<any> = [];
    groupSnapshot.docs.forEach((_data) => {
        if (_data.data().age >= criteria.age[0] && _data.data().age <= criteria.age[1] &&
            _data.data().levelOfExperience >= criteria.levelOfExperience[0] && _data.data().levelOfExperience <= criteria.levelOfExperience[1] && _data.id !== uid) {
                data.push({ id: _data.id, ..._data.data() });
            
        }
    });
    return data as Array<UserData>;
}
export const getSearchList = async (): Promise<UserSearchProfiles[]> => {
    const groupRef = collection(db, COLLENCTION_SEARCHPROFILE_NAME);
    const groupSnap = await getDocs(groupRef);
    const data: Array<any> = [];
    groupSnap.docs.forEach((_data) => {
        data.push({ id: _data.id, ..._data.data() });
    });
    return data as Array<UserSearchProfiles>;
    
  };
  export const getSearchProfileList = async (uid : any): Promise<UserSearchProfiles[]> => {
    const q = query(collection(db, COLLENCTION_SEARCHPROFILE_NAME), where("uid", "==", uid));
    const groupSnapshot = await getDocs(q);
    const data: Array<any> = [];
    groupSnapshot.docs.forEach((_data) => {
        data.push({ id: _data.id, ..._data.data() });
    });
   return data as Array<UserSearchProfiles>;
   };
  export const getUpdateSearchList = async (userId: any): Promise<UserSearchProfiles[]> => {
    const groupRef = collection(db, COLLENCTION_SEARCHPROFILE_NAME);
    const groupSnap = await getDocs(groupRef);
    const data: Array<any> = [];
    groupSnap.docs.forEach((_data) => {
        if(userId !== _data.id){
        data.push({ id: _data.id, ..._data.data() });
        }
    });
    console.log(data as Array<UserSearchProfiles> + ' line 48');
    return data as Array<UserSearchProfiles>;
    
  };