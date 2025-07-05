'use client';

import { useState, useEffect } from 'react';
import { fetchNotes, NotesResponseProps } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
    initialData: NotesResponseProps;
    initialTag?: string;
}

export default function NotesClient({
    initialData,
    initialTag,
}: NotesClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [debounceQuery] = useDebounce(searchText, 400);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { data } = useQuery({
        queryKey: ['notes', debounceQuery, currentPage, initialTag],
        queryFn: () => fetchNotes(searchText, currentPage, initialTag),
        placeholderData: keepPreviousData,
        initialData: currentPage === 1 && !debounceQuery ? initialData : undefined,
    });

    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => {
        setIsOpenModal(false);
    };

    const totalPages = data?.totalPages ?? 1;
    const notes = data?.notes ?? [];

    // Don't render interactive elements until mounted
    if (!isMounted) {
        return (
            <div className={css.app}>
                <header className={css.toolbar}>
                    <div>Loading...</div>
                </header>
                {initialData?.notes && initialData.notes.length > 0 && (
                    <NoteList notes={initialData.notes} />
                )}
            </div>
        );
    }

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchText} onSearch={handleSearch} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>
            {data && notes.length > 0 && <NoteList notes={notes} />}
            {isOpenModal && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} onSuccess={closeModal} />
                </Modal>
            )}
        </div>
    );
}