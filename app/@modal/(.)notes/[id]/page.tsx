import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview";

type NotePreviewProps = {
    params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: NotePreviewProps) => {
    const { id } = await params;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(Number(id)),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient />
        </HydrationBoundary>
    );
};
export default NotePreview;
