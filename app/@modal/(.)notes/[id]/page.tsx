import { notFound } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

// NotePreview component is imported, so no need to define it here

const NotePreview: React.FC<NotePreview> = ({ note }) => {
    return (
        <div className="container">
            <div className="item">
                <div className="header">
                    <h2>{note.title}</h2>
                    <span className="tag">{note.tag}</span>
                </div>
                <p className="content">{note.content}</p>
                <p className="date">
                    Created: {new Date(note.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

// export default async function InterceptedNotePage({ params }: PageProps) {
//     try {
//         const note = await (await notesApi()).getNoteById(params.id);
//         return (
//             <Modal>
//                 <NotePreview note={note} />
//             </Modal>
//         );
//     } catch (error) {
//         notFound();
//     }
// }