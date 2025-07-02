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

    // Check if ID is valid before making the query
    if (!id || Number.isNaN(parsedId)) {
        return <p>Invalid ID</p>;
    }

    const {
        data: note,
        isLoading,
        isError,
    } = useQuery<Note>({
        queryKey: ["note", id], // Use consistent query key
        queryFn: () => fetchNoteById(parsedId),
        enabled: !!id && !Number.isNaN(parsedId), // Only run query if ID is valid
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError || !note) return <p>Something went wrong.</p>;

    return (
        <Modal onClose={handleCloseModal}>
            <NotePreview note={note} onClose={handleCloseModal} />
        </Modal>
    );
}