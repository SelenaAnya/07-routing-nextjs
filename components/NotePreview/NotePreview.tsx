import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default async function InterceptedNotePage({ params }: { params: { id: string } }) {
    try {
        const api = await notesApi(); // Ensure the API is initialized
        const note = await api.getNoteById(params.id);
        return (
            <Modal>
                <NotePreview note={note} />
            </Modal>
        );
    } catch (error) {
        notFound();
    }
}