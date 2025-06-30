import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
// Ensure NotePreview accepts a 'note' prop of type Note
import { Note } from '@/types/note'; // Adjust the import path if needed
interface PageProps {
    params: {
        id: string;
    };
}
interface NotePreviewProps {
    note: Note;
}
export function NotePreview({ note }: NotePreviewProps) {
    // component implementation
    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <span>{note.tag}</span>
            <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
        </div>
    );
}
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