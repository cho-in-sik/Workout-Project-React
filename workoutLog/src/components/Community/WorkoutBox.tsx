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
import { useState } from 'react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import HeartButton from './HeartButton';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function WorkoutBox() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { recordId } = useParams();

  const [like, setLike] = useState(false);
  if (recordId === undefined) return;
  const recordRef = doc(db, 'workoutrecords', recordId);
  const fetchRecord = async () => {
    const snapshot = await getDoc(recordRef);
    return snapshot.data();
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
  //좋아요 기능
  const toggleLike = async () => {
    setLike(!like);

    if (data?.like) {
      await updateDoc(recordRef, { like: data?.like + 1 });
    }
  };
  const updateMutation = useMutation({
    mutationFn: () => toggleLike(),
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['record'],
    queryFn: fetchRecord,
  });
  const deleteMutation = useMutation({
    mutationFn: () => handleDelete(),
  });

  if (isLoading) {
    return <h1>loading..</h1>;
  }
  if (isError) {
    console.log(error);
    return <h1>error</h1>;
  }

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'red[500]' }}
            aria-label="recipe"
            src={data?.profileUrl}
          />
        }
        action={
          user?.uid === data?.userId ? (
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteMutation.mutate()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
        title={data?.username}
      />
      <CardMedia
        component="img"
        height="194"
        image={data?.photoUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <HeartButton click={() => updateMutation.mutate()} like={like} />

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <span>{`${data?.like}`}</span>
    </Card>
  );
}
