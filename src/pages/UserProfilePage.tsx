import React from 'react';
import { Box } from '@mui/material';
import NavBar from 'components/navBar/NavBar';
import { PageName } from 'types';
import UserProfile  from 'components/profile/UserProfile';
function UserProfilePage(){
    return (
    
        <Box sx={{ justifyContent: 'center' }}>
        <NavBar selectedName={PageName.UPDATEUSER} />
        < UserProfile/>
         </Box>
        );
}
export default UserProfilePage;