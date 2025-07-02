'use client';

import { useState } from 'react';
import { fetchNotes, type NotesResponse } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
    initialData: NotesResponse;
    tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [debounceSearchQuery] = useDebounce(searchQuery, 400);
    const perPage = 12;

    const { data } = useQuery({
        queryKey: ['notes', currentPage, debounceSearchQuery, tag],
        queryFn: () => fetchNotes(currentPage, debounceSearchQuery, perPage, tag),
        placeholderData: keepPreviousData,
        initialData: currentPage === 1 && !debounceSearchQuery ? initialData : undefined,
    });

    // console.log('Data on Vercel:', data);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox searchQuery={searchQuery} onChange={handleSearchChange} />
                {data && data.totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={data.totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>
            {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} />
                </Modal>
            )}
        </div>
    );
};

