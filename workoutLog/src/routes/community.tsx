import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface IRecords {
  createdAt: number;
  category: number;
  content: string;
  photoUrl: string;
  username: string;
  id: string;
  userId: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Community() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<IRecords[]>([]);
  const fetchRecords = async () => {
    const recordsQuery = query(
      collection(db, 'workoutrecords'),
      orderBy('createdAt', 'desc'),
    );
    const snapshot = await getDocs(recordsQuery);
    const records = snapshot.docs.map((doc) => {
      const { createdAt, category, content, photoUrl, username, userId } =
        doc.data();
      return {
        createdAt,
        category,
        content,
        photoUrl,
        username,
        id: doc.id,
        userId,
      };
    });
    setRecords(records);
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  console.log(records);
  const handleClick = (record: IRecords) => {
    navigate(record.id, { state: { record } });
  };
  return (
    <Wrapper>
      <ImageList sx={{ width: 430, height: 700 }} cols={3} rowHeight={160}>
        {records.map((record) => (
          <ImageListItem key={record.id}>
            <img
              srcSet={`${record.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${record.photoUrl}?w=164&h=164&fit=crop&auto=format`}
              alt={record.content}
              loading="lazy"
              onClick={() => handleClick(record)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Wrapper>
  );
}
