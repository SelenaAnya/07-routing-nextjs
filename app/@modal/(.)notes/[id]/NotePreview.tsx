'use client';

// import { useQuery } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import NotePreview from '@/components/NotPreview/NotPreview';
import Modal from '@/components/Modal/Modal';
// import { Note } from "@/types/note";

export default function PreviewClient() {
  const { id } = useParams();

  const router = useRouter();

  
  const closeModal = () => router.back();
  return (
    <Modal onClose={closeModal}>
      <NotePreview id={Number(id)} onClose={closeModal} />
    </Modal>
  );
}