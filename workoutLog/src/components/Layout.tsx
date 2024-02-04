import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import mainLogo from '../assets/healthLog.png';
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import UserIcon from './UserIcon';

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
  const user = auth.currentUser;

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
              sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}
            >
              <NavLink
                to={'/community'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                community
              </NavLink>
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
          {user && <UserIcon />}
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
