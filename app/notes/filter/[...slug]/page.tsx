import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { AVAILABLE_TAGS } from '@/types/note';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { slug?: string[] };
}

export default async function NotesFilterPage({ params }: PageProps) {
    const tag = params.slug?.[0] ?? 'All';
    if (!AVAILABLE_TAGS.includes(tag as any)) {
        notFound();
    }
    const initialData = await fetchNotes(1, '', 12, tag === 'All' ? undefined : tag);
    return <NotesClient initialData={initialData} selectedTag={tag} />;
}