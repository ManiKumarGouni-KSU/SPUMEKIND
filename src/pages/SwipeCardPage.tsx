import React from 'react';
import SwipeCard from 'components/swipeCard/SwipeCard';
import { Box } from '@mui/material';
import NavBar from 'components/navBar/NavBar';
import { PageName } from 'types';


function SwipeCardPage() {
  return (
    
    <Box sx={{ justifyContent: 'center' }}>
    <NavBar selectedName={PageName.SWIPRCARD} />
    
      
      < SwipeCard/>
      
    </Box>
    
    
  );
}

export default SwipeCardPage;
