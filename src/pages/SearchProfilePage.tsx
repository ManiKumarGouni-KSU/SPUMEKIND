import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavBar from 'components/navBar/NavBar';
import { PageName } from 'types';
import SearchProfile from 'components/searchProfiles/SearchProfile';
 function SearchProfilePage(){
    return (
        <Box sx={{ display: 'flex' }}>
           <NavBar selectedName={PageName.SEARCHPROFILE} />
          <Box
            component='main'
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
             <Toolbar />
            <SearchProfile/>
          </Box>
        </Box>
      );
 }
 export default SearchProfilePage;