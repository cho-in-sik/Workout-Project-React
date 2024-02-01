import Title from './Title';
import Typography from '@mui/material/Typography';
import WeightRulesModal from './WeightRuleModal';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Fragment, useEffect, useState } from 'react';
import { Unsubscribe } from 'firebase/auth';

interface IWeights {
  id: string;
  dead: number;
  squat: number;
  bench: number;
  userId?: string;
  username?: string;
  createdAt: number;
}

export default function Deposits() {
  const user = auth.currentUser;
  const [weights, setWeights] = useState<IWeights[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchWeights = async () => {
      const weightQuery = query(
        collection(db, '3weights'),
        where('userId', '==', user?.uid),
        orderBy('createdAt', 'desc'),
        limit(1),
      );
      // const snapshot = await getDocs(weightQuery);
      // const weights = snapshot.docs.map((doc) => {
      //   const { createdAt, squat, bench, dead } = doc.data();
      //   return { createdAt, squat, bench, dead, id: doc.id };
      // });
      unsubscribe = onSnapshot(weightQuery, (snapshot) => {
        const weights = snapshot.docs.map((doc) => {
          const { createdAt, squat, bench, dead } = doc.data();
          return { createdAt, squat, bench, dead, id: doc.id };
        });
        setWeights(weights);
      });
    };
    fetchWeights();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      <Title>TOTAL</Title>
      <Typography component="p" variant="h3" align="center" marginBottom={1}>
        {weights[0]?.bench + weights[0]?.squat + weights[0]?.dead}
      </Typography>
      <Typography component="p" variant="h6">
        S:{` ${weights[0]?.squat}KG`}
      </Typography>
      <Typography component="p" variant="h6">
        B:{` ${weights[0]?.bench}KG`}
      </Typography>
      <Typography component="p" variant="h6">
        D:{` ${weights[0]?.dead}KG`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <WeightRulesModal />
    </Fragment>
  );
}
