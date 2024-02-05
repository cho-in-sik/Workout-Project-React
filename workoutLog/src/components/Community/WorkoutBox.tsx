import { useLocation } from 'react-router-dom';

export default function WorkoutBox() {
  const {
    state: {
      record: { createdAt, category, content, photoUrl, username, id, userId },
    },
  } = useLocation();
  return <h1>{content}</h1>;
}
