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
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';

interface IForm {
  category?: string;
  content?: string;
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
    try {
      console.log(data);
      // navigate('/community');
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
        <VisuallyHiddenInput type="file" />
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
