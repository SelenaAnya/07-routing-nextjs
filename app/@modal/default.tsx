import { fetchNoteById } from '@/lib/api/notes';
import Link from 'next/link';
import css from './NoteDetails.module.css';

interface NotePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function NotePage({ params }: NotePageProps) {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return (
        <div className={css.container}>
            <div className={css.item}>
                <Link href="/notes/filter/All" className={css.backBtn}>
                    ← Back to Notes
                </Link>
                <div className={css.header}>
                    <h1>{note.title}</h1>
                    <span className={css.tag}>{note.tag}</span>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>
                    Created: {new Date(note.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
}