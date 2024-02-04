import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Record() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
      />
      <Button sx={{ minWidth: 300, marginTop: 3 }} variant="contained">
        등록하기
      </Button>
    </Wrapper>
  );
}
