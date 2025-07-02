'use client';

import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  if (!id || Number.isNaN(Number(id)))
    return <p>Note ID is missing.</p>;
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
          <div className={css.date}>{note.createdAt}</div>
          {note.tag && <p className={css.tags}>Tag: {note.tag}</p>}
        </div>
      )}
    </div>
  );
}

