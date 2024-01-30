import { Button, TextField } from '@mui/material';
import Title from './Title';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Form = styled.form`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default function Write() {
  const [squat, setSquat] = useState<Number>();
  const [bench, setBench] = useState<Number>();
  const [dead, setDead] = useState<Number>();
  const [totalWeight, setTotalWeight] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (e.target.id === 'Squat') {
      setSquat(value);
    } else if (e.target.id === 'BenchPress') {
      setBench(value);
    } else if (e.target.id === 'DeadLift') {
      setDead(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const user = auth.currentUser;
    e.preventDefault();
    if (!user || squat === null || bench === null || dead === null) return;

    try {
      await addDoc(collection(db, '3weights'), {
        squat,
        bench,
        dead,
        createdAt: Date.now(),
        username: user.displayName || 'Anonymous',
        userId: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Title>TOTAL</Title>
      <Typography component="p" variant="h4" align="center" marginBottom={2}>
        {totalWeight} kg
      </Typography>
      <Form onSubmit={onSubmit}>
        <TextField
          type="number"
          id="Squat"
          label="Squat"
          variant="outlined"
          size="small"
          value={squat}
          onChange={onChange}
        />
        <TextField
          type="number"
          id="BenchPress"
          label="BenchPress"
          variant="outlined"
          size="small"
          value={bench}
          onChange={onChange}
        />
        <TextField
          type="number"
          id="DeadLift"
          label="DeadLift"
          variant="outlined"
          size="small"
          value={dead}
          onChange={onChange}
        />
        <div>
          <Button
            type="submit"
            style={{ width: '40%', float: 'right' }}
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </Form>
    </Fragment>
  );
}
