'use client';
import React from 'react';
import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const { mutate: deleteNoteMutation } = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.linkItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`} className={css.link}>
                            View details
                        </Link>
                        <button
                            type="button"
                            className={css.button}
                            onClick={() => deleteNoteMutation(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}