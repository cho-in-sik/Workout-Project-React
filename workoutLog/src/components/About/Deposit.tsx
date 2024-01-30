import * as React from 'react';
import Title from './Title';
import Typography from '@mui/material/Typography';
import WeightRulesModal from './WeightRuleModal';

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>TOTAL</Title>
      <Typography component="p" variant="h3" align="center" marginBottom={1}>
        350KG
      </Typography>
      <Typography component="p" variant="h6">
        S:{` ${100}KG`}
      </Typography>
      <Typography component="p" variant="h6">
        B:{` ${100}KG`}
      </Typography>
      <Typography component="p" variant="h6">
        D:{` ${150}KG`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <WeightRulesModal />
    </React.Fragment>
  );
}
