import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import { Note } from '@/types/note';

// Internal NotePreview component
function NotePreview({ note }: { note: Note }) {
    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <span>{note.tag}</span>
            <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
        </div>
    );
}

// Main page component - this should be the default export
export default async function InterceptedNotePage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const api = await notesApi();
        const note = await api.getNoteById(id);

        return (
            <Modal>
                <NotePreview note={note} />
            </Modal>
        );
    } catch (error) {
        notFound();
    }
}