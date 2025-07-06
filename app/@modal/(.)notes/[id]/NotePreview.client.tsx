'use client';

import { useParams, useRouter } from 'next/navigation';
import NotePreview from '@/components/NotPreview/NotPreview';
import Modal from '@/components/Modal/Modal';


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