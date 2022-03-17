
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthChange } from 'db/repository/auth';
import LandingPage from 'pages/LandingPage';
import { setUser } from 'modules/user';
import { useAppDispatch } from 'hooks';


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
       
        navigate('/landing');
        dispatch(setUser(null));
      
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/dashboard' element={<></>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
