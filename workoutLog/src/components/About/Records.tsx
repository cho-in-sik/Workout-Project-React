import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { auth, db } from '../../firebase';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

interface IWeight {
  id: string;
  squat: number;
  bench: number;
  dead: number;
  username?: string;
  userId?: string;
  createdAt: number;
}

export default function Records() {
  const user = auth.currentUser;
  const [weights, setWeights] = useState<IWeight[]>([]);
  const fetchWeights = async () => {
    const weightsQuery = query(
      collection(db, '3weights'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(12),
    );
    const snapshot = await getDocs(weightsQuery);
    const weights = snapshot.docs.map((doc) => {
      const { createdAt, squat, bench, dead, userId } = doc.data();
      return { createdAt, squat, bench, dead, id: doc.id, userId };
    });
    setWeights(weights);
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  function dateFormat(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + '시';
  }

  return (
    <Fragment>
      <Title>Records</Title>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Squat</TableCell>
              <TableCell>BenchPress</TableCell>
              <TableCell>DeadLift</TableCell>
              <TableCell align="right">TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weights.map((weight) => (
              <TableRow key={weight.id}>
                <TableCell>{`${dateFormat(
                  new Date(weight.createdAt),
                )}`}</TableCell>
                <TableCell>{weight.squat}</TableCell>
                <TableCell>{weight.bench}</TableCell>
                <TableCell>{weight.dead}</TableCell>
                <TableCell align="right">{`${
                  weight.bench + weight.squat + weight.dead
                }`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}
