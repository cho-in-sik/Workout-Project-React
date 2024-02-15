import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

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

  const fetchRecords = async () => {
    const recordsQuery = query(
      collection(db, 'workoutrecords'),
      orderBy('createdAt', 'desc'),
    );
    const snapshot = await getDocs(recordsQuery);
    // return snapshot;
    const recordds = snapshot.docs.map((doc) => {
      const {
        createdAt,
        category,
        content,
        photoUrl,
        username,
        userId,
        profileUrl,
      } = doc.data();
      return {
        createdAt,
        category,
        content,
        photoUrl,
        username,
        id: doc.id,
        userId,
        profileUrl,
      };
    });
    return recordds;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery<IRecords[]>({
      queryKey: ['records'],
      queryFn: ({ pageParam }) => fetchRecords(),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        // console.log(lastPage);
        return undefined;
      },
    });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error!{error.toString()}</div>;
  }

  // useEffect(() => {
  //   fetchRecords();
  // }, []);

  const handleClick = (record: IRecords) => {
    navigate(record.id, { state: { record } });
  };
  return (
    <Wrapper>
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        <ImageList sx={{ width: 430, height: 700 }} cols={3} rowHeight={160}>
          {data === undefined && <span>2</span>}
          {data?.pages.map((items) =>
            items.map((record) => {
              return (
                <ImageListItem key={record.id}>
                  <img
                    style={{ cursor: 'pointer' }}
                    srcSet={`${record.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${record.photoUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt={record.content}
                    loading="lazy"
                    onClick={() => handleClick(record)}
                  />
                </ImageListItem>
              );
            }),
          )}
        </ImageList>
      </InfiniteScroll>
    </Wrapper>
  );
}
