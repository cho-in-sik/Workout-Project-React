import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FirebaseError } from 'firebase/app';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { IForm } from './join';
import { useForm } from 'react-hook-form';
import { ErrorAlert } from '../components/alert';
import GithubButton from '../components/github-btn';

function Copyright(props: any) {
  return (
    <Typography
      variant="body1"
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

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = async (data: IForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(
          'firebaseError',
          { message: `${e.message}` },
          { shouldFocus: true },
        );
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={600}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onValid)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email "
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                  message: '네이버 아이디만 가능합니다.',
                },
              })}
            />
            <ErrorAlert errors={errors?.email?.message} />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
                minLength: {
                  value: 6,
                  message: '최소 6글자 이상입니다.',
                },
              })}
            />
            <ErrorAlert errors={errors?.password?.message} />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <GithubButton />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container marginBottom={2}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호를 잊어버렸습니까?
                </Link>
              </Grid>
              <Grid item>
                <Link href="join" variant="body2">
                  {'계정이 없으시나요? Join'}
                </Link>
              </Grid>
            </Grid>
            <ErrorAlert errors={errors?.firebaseError?.message} />
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
