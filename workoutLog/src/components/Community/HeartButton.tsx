import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

export default function HeartButton({ click, like }: any) {
  return (
    <IconButton aria-label="add to favorites" onClick={click}>
      <FavoriteIcon style={like ? { color: 'tomato' } : { color: 'inherit' }} />
    </IconButton>
  );
}
