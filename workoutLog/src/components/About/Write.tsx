import Title from './Title';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

export default function Write() {
  return (
    <Fragment>
      <Title>TOTAL</Title>
      <Typography component="p" variant="h3" align="center" marginBottom={3}>
        350KG
      </Typography>
      <Typography component="p" variant="h6" marginBottom={2}>
        S:{` ${100}KG`}
      </Typography>
      <Typography component="p" variant="h6" marginBottom={2}>
        B:{` ${100}KG`}
      </Typography>
      <Typography component="p" variant="h6" marginBottom={2}>
        D:{` ${150}KG`}
      </Typography>
    </Fragment>
  );
}
