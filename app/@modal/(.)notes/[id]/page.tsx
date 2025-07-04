import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview";

type NotePreviewProps = {
    params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: NotePreviewProps) => {
    const { id } = await params;
    const parseId = Number(id);

const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: ["note", parseId],
        queryFn: () => fetchNoteById(parseId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient />
        </HydrationBoundary>
    );
};
export default NotePreview;
