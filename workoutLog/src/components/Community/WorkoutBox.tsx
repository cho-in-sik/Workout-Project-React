import { useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

interface IRecord {
  category?: number;
  content?: string;
  createdAt?: number;
  photoUrl?: string;
  profileUrl?: string;
  userId?: string;
  username?: string;
}

export default function WorkoutBox() {
  const user = auth.currentUser;
  const { recordId } = useParams();
  const [record, setRecord] = useState<IRecord>({});

  const fetchRecord = async () => {
    if (recordId === undefined) return;
    const recordRef = doc(db, 'workoutrecords', recordId);
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
