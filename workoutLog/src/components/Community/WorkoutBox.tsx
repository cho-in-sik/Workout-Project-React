import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import HeartButton from './HeartButton';

interface IRecord {
  category?: number;
  content?: string;
  createdAt?: number;
  photoUrl?: string;
  profileUrl?: string;
  userId?: string;
  username?: string;
  like?: number;
}

export default function WorkoutBox() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { recordId } = useParams();
  const [record, setRecord] = useState<IRecord>({});

  const [like, setLike] = useState(false);
  if (recordId === undefined) return;
  const recordRef = doc(db, 'workoutrecords', recordId);
  const fetchRecord = async () => {
    // if (recordId === undefined) return;
    // const recordRef = doc(db, 'workoutrecords', recordId);
    onSnapshot(recordRef, (snapshot) => {
      if (snapshot.exists()) {
        setRecord(snapshot.data());
      }
    });
  };
  console.log(record);
  useEffect(() => {
    fetchRecord();
  }, []);
  console.log(like);
  const toggleLike = async () => {
    setLike(!like);
    //localstorage에 like 상태 유지? react query 사용해서 구현
    if (record.like) {
      await updateDoc(recordRef, { like: record.like + 1 });
    }
  };
  //본인 기록 삭제
  const handleDelete = async () => {
    try {
      await deleteDoc(recordRef);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'red[500]' }}
            aria-label="recipe"
            src={record.profileUrl}
          />
        }
        action={
          user?.uid === record.userId ? (
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
        title={record.username}
      />
      <CardMedia
        component="img"
        height="194"
        image={record.photoUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {record.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <HeartButton click={toggleLike} like={like} />
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
