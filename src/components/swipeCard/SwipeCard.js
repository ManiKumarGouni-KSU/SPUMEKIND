import { useState, useEffect } from 'react';
import  './swipeMatchCard.css';
import TinderCard from 'react-tinder-card';
import { doc, getDoc,onSnapshot } from "firebase/firestore";
import db from '../../db';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where,getDocs } from "firebase/firestore";

function SwipeCard() {

  let [interests,setInterests]=useState([]);
  let [dbs,setDBS] = useState( [
     {
      name: 'Richard Hendricks',
      url: './img/richard.jpg',
      interests: interests
    },
  ]
  )
   
  
  useEffect(() => {

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const usersRef = collection(db, "users");
      console.log("At swipe ");
      // Create a query against the collection.
        const q = query(usersRef, where("photoURL", "!=", ""));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          
         // console.log("In swipe"+doc.id, " => ", doc.data());
          setDBS(dbs=>[...dbs,{"name":doc.data().firstName,"url":doc.data().photoURL}]);
        });
     /*  const uid = user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      } */
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  
},dbs);
console.log("outside"+dbs.length);
  
  
  

  //make the first lettr of each person capital
  const capitalizeFirstLetter= (string)=> {
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }


  return (
    <div>
      <div className='tinderCards__cardContainer'>
        {dbs.map((person, index) => (
          <TinderCard className='swipe' preventSwipe={['up', 'down']} key={index}>
            <div className='card' style={{backgroundImage: `url(${person.url})`}}>
              <h3>{capitalizeFirstLetter(person.name)}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      
    </div>
  )
}

export default SwipeCard;
