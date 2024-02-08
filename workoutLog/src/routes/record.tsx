import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { VisuallyHiddenInput } from '../components/VisuallyHiddenInput';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface IForm {
  category?: string;
  content?: string;
  photo?: FileList;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Record() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { register, handleSubmit, setError } = useForm();

  const onSubmit = async (data: IForm) => {
    if (user === null || data.photo === undefined) return;

    try {
      //storage에 사진 저장
      const file = data.photo[0];
      const locationRef = ref(
        storage,
        `workoutrecords/${Date.now()}-${user.uid}-${user.displayName}`,
      );
      const result = await uploadBytes(locationRef, file);
      const workoutRecordrUrl = await getDownloadURL(result.ref);

      //db에 정보 저장
      await addDoc(collection(db, 'workoutrecords'), {
        category: data.category,
        content: data.content,
        createdAt: Date.now(),
        username: user.displayName || 'Anonymous',
        userId: user.uid,
        photoUrl: workoutRecordrUrl,
        profileUrl: user.photoURL,
        like: 0,
      });
      navigate('/community');
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
    <Wrapper>
      <Typography variant="h3" gutterBottom my={5}>
        기록하기
      </Typography>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        color="info"
      >
        사진 추가
        <VisuallyHiddenInput
          type="file"
          {...register('photo', { required: true })}
        />
      </Button>

      <Box sx={{ minWidth: 300, marginTop: 5 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            {...register('category', { required: true })}
          >
            <MenuItem value={10}>프리웨이트</MenuItem>
            <MenuItem value={20}>머신</MenuItem>
            <MenuItem value={30}>오운완</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        label="내용입력"
        variant="outlined"
        sx={{ minWidth: 300, marginTop: 3 }}
        multiline
        rows={4}
        {...register('content', { required: '내용을 입력하세요.' })}
      />
      <Button
        sx={{ minWidth: 300, marginTop: 3 }}
        variant="contained"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        등록하기
      </Button>
    </Wrapper>
  );
}
