
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthChange } from 'db/repository/auth';
import LandingPage from 'pages/LandingPage';
import { setUser } from 'modules/user';
import { useAppDispatch } from 'hooks';
import { getLoggedInUser } from 'db/repository/user';
import DashboardPage from 'pages/DashboardPage';
import SwipeCardPage from 'pages/SwipeCardPage';
import SearchProfilePage from 'pages/SearchProfilePage';
import {
  CometChatUI
} from 'components/CometChatWorkspace/src/components';

function App() {
  const dispatch = useAppDispatch();
  const theme = createTheme({
    palette: {
      primary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    typography: {
      guideline: {
        color: 'gray',
        display: 'block',
      },
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    onAuthChange(async (user: any) => {
      if (user) {
        navigate('/dashboard');
        dispatch(setUser(await getLoggedInUser(user)));
      } else {
        navigate('/landing');
        dispatch(setUser(null));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='/swipeCard' element={<SwipeCardPage/>} />
        <Route path='/searchProfile' element={<SearchProfilePage/>} />
       
        <Route path='/chat' element={<CometChatUI/>} />
                    
      </Routes>
    </ThemeProvider>
  );
}

export default App;
