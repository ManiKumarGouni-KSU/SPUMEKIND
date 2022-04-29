import React, { useEffect, useState }  from 'react';
import  './swipeMatchCard.css';
import TinderCard from 'react-tinder-card';
import {getSearchProfileList} from 'db/repository/search';
import { UserSearchProfiles } from 'types/index';
import { auth } from 'db';
import { useNavigate } from 'react-router-dom';
import MdMessage from '@mui/icons-material/Message';
import Chip from '@mui/material/Chip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  'components/CometChatWorkspace/src/components';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from 'consts';
function SwipeCard() {
  const navigate = useNavigate();
  const [group, setGroup] = useState<UserSearchProfiles[]>();
  useEffect(() => {
    const getUserMatches = async () => {
      const currentUser = auth.currentUser || { uid: '' };
      const getList = await getSearchProfileList(currentUser.uid);
      setGroup(getList);
    };
    getUserMatches();
  }, []);
 
  const theme = createTheme({
    components: {
      MuiIcon: {
        styleOverrides: {
          root: {
            // Match 24px = 3 * 2 + 1.125 * 16
            boxSizing: 'content-box',
            padding: 3,
            fontSize: '1.125rem',
          },
        },
      },
    },
  });
  //make the first lettr of each person capital
  const capitalizeFirstLetter= (value: string)=> {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  console.log('component render')
  const loginCometChat = async ()=>{
    try {
      const user = await CometChat.login(
        COMETCHAT_CONSTANTS.USER_UID,
        COMETCHAT_CONSTANTS.AUTH_KEY,
      );
      console.log('Login Successful:', { user });
      navigate(`/chat`);
    } catch (error) {
      console.log('Login failed with exception:', { error });
    }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
      <button onClick={() => loginCometChat()}>
       <Chip icon={<MdMessage />} label="" />
        </button>
      </ThemeProvider> 
         
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
