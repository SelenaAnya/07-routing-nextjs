import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';


interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

const NotesByCategory = async ({ params }: PageProps) {
    const { slug } = await params;
    const category = slug ? slug.join('/') : undefined;
    const data = await fetchNotes('', 1, category);

    return (
        <div>
            <NotesClient initialData={data} tag={category} />
        </div>
    );
};

export default NotesByCategory;
