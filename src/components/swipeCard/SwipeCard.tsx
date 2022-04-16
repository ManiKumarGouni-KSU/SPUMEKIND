import React from 'react'
import  './swipeMatchCard.css';
import TinderCard from 'react-tinder-card';



function SwipeCard() {
  const dbs = [
    {
      name: 'Richard Hendricks',
      url: './img/richard.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: './img/erlich.jpg'
    },
    {
      name: 'Monica Hall',
      url: './img/monica.jpg'
    },
    {
      name: 'Jared Dunn',
      url: './img/jared.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: './img/dinesh.jpg'
    }
  ]
  
  

  //make the first lettr of each person capital
  const capitalizeFirstLetter= (value: string)=> {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  console.log('component render')

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
