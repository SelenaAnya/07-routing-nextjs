'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Error from '@/components/Error/Error';

const NoteDetailsClient = () => {
  const { id } = useParams();
  const router = useRouter();
  const parseId = Number(id);
  
  const back = () => 
    router.back();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', parseId], 
    queryFn: () => fetchNoteById(parseId),
    refetchOnMount: false,
  });

  return (
  <>
    {isLoading && <p>Loading, please wait...</p>}
      {isError && <Error message="Something went wrong." />}
      {note && (

      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <div className={css.content}>{note.content}</div>
          <div className={css.date}>{note?.createdAt}</div>
        </div>
        </div>
      )}
  </>
  );
};

export default NoteDetailsClient;