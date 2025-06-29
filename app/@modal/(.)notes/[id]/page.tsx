import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

interface PageProps {
    params: {
        id: string;
    };
}

export default async function InterceptedNotePage({ params }: PageProps) {
    try {
        const note = await notesApi.getNoteById(params.id);
        return (
            <Modal>
                <NotePreview note={note} />
            </Modal>
        );
    } catch (error) {
        notFound();
    }
}