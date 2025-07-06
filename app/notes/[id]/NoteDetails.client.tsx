'use client';

import { fetchNotes} from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotPreview/NotPreview';


export default function NotesClient() {
  const { id } = useParams();
  const router = useRouter();
  const back = () => router.back();

  return (
    <Modal onClose={back}>
      <NotePreview id={Number(id)} onClose={back} />
    </Modal>
  );
}
