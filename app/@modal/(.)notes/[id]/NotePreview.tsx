'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
    const { id } = useParams() as { id: string };
    const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(Number(id)),
        enabled: !!id && !isNaN(Number(id)),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    const handleClose = () => {
        router.back();
    };

    return (
        <Modal onClose={() => router.back()}>
            <div className={css.container}>
                {note && (
                    <div className={css.item}>
                        <div className={css.header}>
                            <h2>{note.title}</h2>
                            <button className={css.editBtn}>Edit note</button>
                        </div>
                        <div className={css.content}>{note.content}</div>
                        {note.tag && (
                            <>
                                <span className={css.tag}>{note.tag}</span>
                                <div className={css.date}>{note.createdAt}</div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default NotePreviewClient;