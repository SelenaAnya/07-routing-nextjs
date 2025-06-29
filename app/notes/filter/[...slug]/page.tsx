import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/Notes.client';

type Props = {
    params: Promise<{ slug?: string[] }>;
};

export default async function FilterPage({ params }: Props) {
    const { slug } = await params;


    const tag = slug && slug.length > 0 && slug[0] !== 'All' ? slug[0] : '';

    const initialData = await fetchNotes(1, '', 12, tag);

    return (
        <div>
            <h1>Notes {tag && `- ${tag}`}</h1>
            <br />
            <NotesClient initialData={initialData} selectedTag={tag} />
        </div>
    );
}