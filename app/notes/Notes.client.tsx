'use client';

import { useState } from 'react';
import { fetchNotes, type NotesResponse } from '@/lib/api';
import NoteModal from '@/components/NoteModal/NoteModal';
import Pagination from '@/components/Pagination/Pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';

interface NotesClientProps {
  initialData: NotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  const perPage = 12;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debounceSearchTerm],
    queryFn: () => fetchNotes(currentPage, debounceSearchTerm, perPage),
    placeholderData: keepPreviousData,
    initialData: currentPage === 1 && !debounceSearchTerm ? initialData : undefined,
  });

  console.log('Data on Vercel:', data);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {isError && <p>Something went wrong. Please try again.</p>}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={closeModal} onSuccess={closeModal} />}
    </div>
  );
}