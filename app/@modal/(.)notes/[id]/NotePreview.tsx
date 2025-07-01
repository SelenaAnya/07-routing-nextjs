import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id!),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    const handleClose = () => {
        router.back();
    };

    return (
        <Modal onClose={() => router.back()}>
            <div className={css.container}>
                {note && (
                    <div className={css.item}>
                        <div className={css.header}>
                            <h2>{note.title}</h2>
                            <button className={css.editBtn}>Edite note</button>
                        </div>
                        <div className={css.content}></p>
                        {note.tag && <><p className={css.tags}>Tag: {note.tag}</p><p className={css.date}>{note.createdAt}</p></>}
                    </div>
                )}
                        // <button className={css.closeButton} onClick={handleClose}>
                        //     Close
                        // </button>
            </div>
        </Modal >
    );
};
export default NotePreviewClient;