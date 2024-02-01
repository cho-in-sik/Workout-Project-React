import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { auth, db } from '../../firebase';
import {
  Unsubscribe,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchWeights = async () => {
      const weightsQuery = query(
        collection(db, '3weights'),
        where('userId', '==', user?.uid),
        orderBy('createdAt', 'desc'),
        limit(12),
      );
      // const snapshot = await getDocs(weightsQuery);
      // const weights = snapshot.docs.map((doc) => {
      //   const { createdAt, squat, bench, dead, userId } = doc.data();
      //   return { createdAt, squat, bench, dead, id: doc.id, userId };
      // });
      // setWeights(weights);
      unsubscribe = onSnapshot(weightsQuery, (snapshot) => {
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

  const onDelete = async (e: any) => {
    const id = e.currentTarget.id;
    try {
      await deleteDoc(doc(db, '3weights', id));
    } catch (error) {
      alert(error);
    }
  };

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
              <TableCell>Squat </TableCell>
              <TableCell>BenchPress</TableCell>
              <TableCell>DeadLift</TableCell>
              <TableCell align="right">TOTAL</TableCell>
              <TableCell align="right" style={{ color: 'tomato' }}>
                DELETE
              </TableCell>
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
                <TableCell align="right">
                  <IconButton
                    id={weight.id}
                    size="small"
                    aria-label="delete"
                    style={{ cursor: 'pointer' }}
                    onClick={onDelete}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}
