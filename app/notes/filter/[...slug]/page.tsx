import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function NotesByCategory({
    params,
}: Props) {
    const { slug } = await params;
    const category = slug[0] === 'all' ? undefined : slug[0];

    const initialData = await fetchNotes('', 1, category);
    
    return (
        <NotesClient initialData={initialData} initialTag={category} />
    );
}