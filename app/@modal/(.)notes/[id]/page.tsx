import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import { Note } from '@/types/note'; // Adjust the import path as necessary
import NotePreview from '@/components/NotePreview/NotePreview';
// Make sure NotePreview accepts a 'note' prop of type Note
interface NotePreviewProps {
    note: Note;
}

export default async function InterceptedNotePage({ params }: { params: { id: string } }) {
    try {
        const api = await notesApi();
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