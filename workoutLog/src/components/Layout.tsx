import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import mainLogo from '../assets/healthLog.png';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Layout() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const onLogOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      auth.signOut();
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            margin={-2}
          >
            <NavLink to={'/'}>
              <img src={mainLogo} alt="Logo" height={100} width={100} />
            </NavLink>
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="record"
              sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}
            >
              write
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}
            >
              community
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/about"
              sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}
            >
              About
            </Link>
          </nav>
          {user ? null : (
            <>
              <Button href="login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login
              </Button>
              <Button href="join" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Join
              </Button>
            </>
          )}
          {user && (
            <Button href="profile" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              profile
            </Button>
          )}
          {user && (
            <Button
              onClick={onLogOut}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
