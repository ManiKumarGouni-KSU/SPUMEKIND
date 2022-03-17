import React from 'react';
import { signIn } from 'db/repository/auth';
import { Button } from '@mui/material';

function Login() {
  const onLogin = async () => {
    signIn();
  };

  return (
    <Button variant='contained' color='primary' onClick={onLogin}>
      Sign In
    </Button>
  );
}

export default Login;