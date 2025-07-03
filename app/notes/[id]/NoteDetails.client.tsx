'use client';

import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  // Use useMemo to ensure consistent date formatting
  const formattedDate = useMemo(() => {
    if (!note?.createdAt) return '';
    return new Date(note.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [note?.createdAt]);

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      {note && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <div className={css.content}>{note.content}</div>
          <div className={css.date}>{formattedDate}</div>
          {note.tag && <p className={css.tags}>Tag: {note.tag}</p>}
        </div>
      )}
    </div>
  );
}

export default NoteDetailsClient;