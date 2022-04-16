import React, { useEffect, useState }  from 'react';
import  './swipeMatchCard.css';
import TinderCard from 'react-tinder-card';
import {getSearchProfileList} from 'db/repository/search';
import { UserSearchProfiles } from 'types/index';
import { auth } from 'db';

function SwipeCard() {
  const [group, setGroup] = useState<UserSearchProfiles[]>();
  useEffect(() => {
    const getUserMatches = async () => {
      const currentUser = auth.currentUser || { uid: '' };
      const getList = await getSearchProfileList(currentUser.uid);
      setGroup(getList);
    };
    getUserMatches();
  }, []);
 
  
  //make the first lettr of each person capital
  const capitalizeFirstLetter= (value: string)=> {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  console.log('component render')

  return (
    <div>
      <div className='tinderCards__cardContainer'>
        {group?.map((doc, index) =>(
          <TinderCard className='swipe' preventSwipe={['up', 'down']} key={index}>
          <div className='card' style={{backgroundImage: `url(${doc.photoURL})`}}>
            <h3>{capitalizeFirstLetter(doc.name)}</h3>
          </div>
        </TinderCard>
        ))}
        
      </div>
      
    </div>
  )
}

export default SwipeCard;
