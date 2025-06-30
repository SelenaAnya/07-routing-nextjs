import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import { Note } from '@/types/note'; // Adjust the import path as necessary
import NotePreview from '@/components/NotePreview/NotePreview';
// Make sure NotePreview accepts a 'note' prop of type Note
interface NotePreviewProps {
    note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
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

export async function generateStaticParams() {
    const api = await notesApi();
    const notes = await api.getAllNotes();
    return notes.map(note => ({ id: note.id }));
}

export async function InterceptedNotePage({ params }: { params: { id: string } }) {
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