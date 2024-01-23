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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

import { FirebaseError } from 'firebase/app';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorAlert } from '../components/alert';

interface IForm {
  name: string;
  email: string;
  password: string;
  check?: boolean;
  firebaseError?: string;
}

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

export default function Join() {
  const navigate = useNavigate();
  // const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const onValid = async (data: IForm) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(credentials.user, {
        displayName: data.name,
      });
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
            Join
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onValid)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  {...register('name', {
                    required: '이름은 필수로 입력하세요.',
                    minLength: {
                      value: 3,
                      message: '최소 3글자 이상 입력해 주세요.',
                    },
                    validate: (value) =>
                      value === 'Matt'
                        ? 'Matt라는 이름을 사용 할 수 없습니다.'
                        : true,
                  })}
                />
              </Grid>
              <ErrorAlert errors={errors?.name?.message} />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  {...register('email', {
                    required: '이메일을 입력하세요.',
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                      message: '네이버 아이디만 가능합니다.',
                    },
                  })}
                />
              </Grid>
              <ErrorAlert errors={errors?.email?.message} />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: '비밀번호를 입력하세요.',
                    minLength: { value: 6, message: '최소 6글자 이상입니다.' },
                  })}
                />
              </Grid>
              <ErrorAlert errors={errors?.password?.message} />
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('check')}
                      color="primary"
                      name="checkBox"
                    />
                  }
                  label="마케팅 정보 수신에 동의합니다."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join
            </Button>
            <ErrorAlert errors={errors?.firebaseError?.message} />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
