import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    if (notes.length === 0) {
        return (
            <div className={css.empty}>
                <p>No notes found. Create your first note!</p>
            </div>
        );
    }

    return (
        <div className={css.grid}>
            {notes.map((note) => (
                <Link key={note.id} href={`/notes/${note.id}`} className={css.card}>
                    <div className={css.cardHeader}>
                        <h3 className={css.title}>{note.title}</h3>
                        <span className={css.tag}>{note.tag}</span>
                    </div>
                    <p className={css.content}>
                        {note.content.length > 100
                            ? `${note.content.substring(0, 100)}...`
                            : note.content}
                    </p>
                    <p className={css.date}>
                        {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                </Link>
            ))}
        </div>
    );
}