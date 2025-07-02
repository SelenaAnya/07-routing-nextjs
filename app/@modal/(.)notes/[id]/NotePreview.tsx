'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import NotePreview from '@/components/NotPreview/NotPreview';
import Modal from '@/components/Modal/Modal';
import { Note } from "@/types/note";

export default function NotePreviewClient() {
    const { id } = useParams();
    const router = useRouter();
    const parsedId = Number(id);

    const handleCloseModal = () => {
        router.back();
    };


    // const { data: note, isLoading, error } = useQuery({
    //     queryKey: ['note', id],
    //     queryFn: () => fetchNoteById(Number(id)),
    //     enabled: !!id && !isNaN(Number(id)),
    // });

    // if (isLoading) return <p>Loading...</p>;
    // if (error || !note) return <p>Something went wrong.</p>;

    // const handleClose = () => {
    //     router.back();
    // };
    const {
        data: note,
        isLoading,
        isError,
    } = useQuery<Note>({
        queryKey: ["notes", parsedId],
        queryFn: () => fetchNoteById(parsedId),
        refetchOnMount: false,
    });

    if (!id || Number.isNaN(id)) return <p>Invalid ID</p>;
    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError || !note) return <p>Something went wrong.</p>;

    return (
        <Modal onClose={handleCloseModal}>
            <NotePreview note={note} onClose={handleCloseModal} />
        </Modal>
    );
}