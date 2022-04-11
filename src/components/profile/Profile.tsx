import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { auth } from 'db';
import { signOutUser } from 'db/repository/auth';
import {deleteUser } from 'db/repository/user';
function Profile() {
  const currentUser = auth.currentUser;
  console.log(currentUser?.photoURL);
  const [photoURL, setPhotoURL] = useState('/anonymous_user_avatar.png');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleLogout = () => {
    signOutUser();
  };
  const deleteAccount = () => {
    let  user = auth.currentUser?.uid;
    deleteUser(user);
    if (window.confirm('Are you sure you want to delete account')) {
    } else {
      setAnchorEl(null);
      console.log('User account not deleted.');
    }
  };
  return (
    <>
      <IconButton
        id='avatar-button'
        sx={{ p: 0 }}
        onClick={handleAvatarClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar alt='profile_image' src={photoURL} />
      </IconButton>
      <Menu
        id='avatar-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'avatar-button' }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={deleteAccount}>Delete Account</MenuItem>
      </Menu>
    </>
  );
}

export default Profile;