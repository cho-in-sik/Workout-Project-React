import { auth } from '../firebase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import weightLifter from '../assets/weightlifter.png';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  return (
    <div>
      <Container
        component="main"
        disableGutters
        sx={{
          pt: 8,
          pb: 6,
          height: '60vh',
          maxHeight: '70vh',
        }}
      >
        {' '}
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          fontWeight="600"
          fontFamily="Rubik"
          fontSize="italic"
        >
          WELCOME.
          {/* {user ? user.displayName : 'Anonymous'} */}
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="600"
          fontFamily="Rubik"
          fontSize="italic"
        >
          Go To the Fuxxing GYM.
        </Typography>
        <Typography
          sx={{ mb: 10 }}
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default MUI components with
          little customization. go to the fuxxing gym.
        </Typography>
        <Button
          sx={{
            display: 'block',
            margin: 'auto',
            scale: '2',
          }}
          color="inherit"
          variant="outlined"
          onClick={() => navigate('record')}
        >
          Go to Write &rarr;
        </Button>
      </Container>
      <Box
        component="main"
        sx={{
          pt: 8,
          pb: 6,
          backgroundImage: `url(${weightLifter})`,
          clipPath: 'polygon(0 30%,100% 8%,100% 100%, 0% 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '60vh',
          maxHeight: '70vh',
        }}
      ></Box>
    </div>
  );
}
