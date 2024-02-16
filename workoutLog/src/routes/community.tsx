import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from 'react';

interface IRecords {
  createdAt?: number;
  category?: number;
  content?: string;
  photoUrl?: string;
  username?: string;
  id?: string;
  userId?: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Community() {
  const navigate = useNavigate();
  const [record, setRecord] = useState<IRecords[]>([]);

  const firstfetchRecords = async () => {
    const recordsQuery = query(
      collection(db, 'workoutrecords'),
      orderBy('createdAt', 'desc'),
      limit(6),
    );
    const snapshot = await getDocs(recordsQuery);
    const records = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setRecord(records);
    return snapshot;
  };
  const nextfetchRecords = async (pageParam: any) => {
    const recordsQuery = query(
      collection(db, 'workoutrecords'),
      orderBy('createdAt', 'desc'),
      limit(6),
      startAfter(pageParam),
    );
    const snapshot = await getDocs(recordsQuery);
    const records = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setRecord((prev) => [...prev, ...records]);
    return snapshot;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['records'],
      queryFn: ({ pageParam }) => {
        return pageParam ? nextfetchRecords(pageParam) : firstfetchRecords();
      },
      initialPageParam: 0,
      getNextPageParam: (lastPageData) => {
        const lastPageParam = lastPageData.docs[lastPageData.docs.length - 1];
        if (lastPageData.size < 6) {
          return undefined;
        }
        return lastPageParam;
      },
    });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error!{error.toString()}</div>;
  }

  const handleClick = (data: IRecords) => {
    navigate(`${data.id}`, { state: { data } });
  };

  return (
    <Wrapper>
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        <ImageList sx={{ width: 430, height: 700 }} cols={3} rowHeight={180}>
          {data === undefined && <span>2</span>}
          {record.map((data, i) => {
            return (
              <ImageListItem key={i}>
                <img
                  style={{ cursor: 'pointer' }}
                  srcSet={`${data.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${data.photoUrl}?w=164&h=164&fit=crop&auto=format`}
                  alt={data.content}
                  loading="lazy"
                  onClick={() => handleClick(data)}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </InfiniteScroll>
    </Wrapper>
  );
}
