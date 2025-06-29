import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function InterceptedNotePage({ params }: PageProps) {
    try {
        const { id } = await params;
        const note = await notesApi.getNoteById(id);
        return (
            <Modal>
                <NotePreview note={note} />
            </Modal>
        );
    } catch (error) {
        notFound();
    }
}