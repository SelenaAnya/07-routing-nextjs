"use client";

import css from "./NotPreview.module.css";
import { useQuery } from "@tanstack/react-query";
import ErrorText from "@/components/Error/Error";
import { fetchNoteById } from "@/lib/api";

type NotePreviewProps = {
  id: number;
  onClose: () => void;
};

export default function NotePreview({ id, onClose }: NotePreviewProps) {
  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["notes", id], 
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <ErrorText message="Something went wrong." />}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
              <button className={css.backBtn} onClick={onClose}>
                Go back
              </button>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
}