import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default async function InterceptedNotePage({ params }: { params: { id: string } }) {
    const api = await notesApi();
    const note = await api.getNoteById(params.id);

    return (
        <Modal>
            <NotePreview note={note} />
        </Modal>
    );
}