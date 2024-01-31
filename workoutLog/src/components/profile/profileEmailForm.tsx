import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import {
  Button,
  CardActions,
  CardOverflow,
  FormControl,
  FormLabel,
  Input,
} from '@mui/joy';
import { auth } from '../../firebase';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { updateEmail, reauthenticateWithCredential } from 'firebase/auth';

export default function ProfileEmailForm() {
  const user = auth.currentUser;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const handleEmailSubmit = async (data: any) => {
    if (data.email === undefined) return;
    try {
      if (user) {
        await updateEmail(user, data?.email);
      }
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        setError('firebaseError', { message: `${e.message}` });
      }
    }
  };
  return (
    <>
      <FormControl sx={{ flexGrow: 1 }} component="form">
        <FormLabel>이메일</FormLabel>

        <Input
          id="email-change"
          size="sm"
          type="email"
          startDecorator={<EmailRoundedIcon />}
          placeholder={user?.email || ''}
          sx={{ flexGrow: 1 }}
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: '네이버 아이디만 가능합니다.',
            },
          })}
        />
      </FormControl>
      <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
          <Button
            type="submit"
            id="email-change"
            size="sm"
            variant="solid"
            onClick={handleSubmit(handleEmailSubmit)}
          >
            Save
          </Button>
        </CardActions>
      </CardOverflow>
    </>
  );
}
