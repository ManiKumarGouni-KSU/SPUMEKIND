import TinderCard from 'react-tinder-card';
import logo from './logo192.png'
import React, { useState } from 'react'
import ProfileUi from 'react-profile-card';
const db = [
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
function SwipeCard(){
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
}

return (
  <div>
  <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
  <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
  <div className='cardContainer'>
    {characters.map((character) =>
      <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
         <div> 
      <ProfileUi 
          imgUrl='https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg' 
          name='Vijay' 
          designation='Architect' 
         
          />
    </div>
      </TinderCard>
    )}
  </div>
  {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
</div>
)

}

export default SwipeCard;