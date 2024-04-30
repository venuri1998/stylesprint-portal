import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CssBaseline, AppBar, Toolbar, IconButton, Snackbar, Divider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import theme from './theme';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component
import StockManagement from './components/stocks';

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: '' });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    let isUserInfoSet = false;
    if (process.env.REACT_APP_ENV === 'development') {
      // Mock the authentication flow
      const mockUserInfo = { username: 'testuser', name: 'Test User' };
      localStorage.setItem('userDetails', JSON.stringify(mockUserInfo));
      isUserInfoSet = true;
    }

    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);
      setLoggedIn(true);
      isUserInfoSet = true;
    }

    if (!isUserInfoSet) {
      const encodedUserInfo = Cookies.get('userinfo');
      if (encodedUserInfo) {
        const userInfo = JSON.parse(atob(encodedUserInfo));
        setUserDetails(userInfo);
        setLoggedIn(true);
        localStorage.setItem('userDetails', JSON.stringify(userInfo));
      }
    }

    setLoading(false); // Set loading to false after authentication check is complete
  }, []);

  const handleLogout = () => {
    // Clear any stored user information
    setUserDetails({});
    setLoggedIn(false);
    localStorage.removeItem('userDetails');

    // Redirect to Choreo logout with session_hint
    const sessionHint = Cookies.get('session_hint');
    window.location.href = `/auth/logout?session_hint=${sessionHint}`;

    Cookies.remove('userinfo', { path: '/' });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <AppBar position="static" color="info">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Styles-Sprint Portal
              </Typography>
              {loggedIn && (
                <IconButton color="inherit" onClick={handleLogout}>
                  {/* <ExitToAppIcon /> */}
                  icon
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute isLoggedIn={loggedIn} />}>
              <Route path="/" element={
                <Container maxWidth="sm">
                  <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
                      Welcome, {userDetails.name}
                    </Typography>
                    <StockManagement />
                    <Divider style={{ margin: '20px 0' }} />
                  </Box>
                </Container>
              } />
            </Route>
          </Routes>
        </Router>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                {/* <CloseIcon fontSize="small" /> */}
                close
              </IconButton>
            </React.Fragment>
          }
        />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
