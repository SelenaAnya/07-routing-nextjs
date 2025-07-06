export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface Tag {
  name: string;
  count: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export interface UpdateNoteData {
  id: number;
  title: string;
  content: string;
  tag: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export const AVAILABLE_TAGS = ['All', 'Work', 'Personal', 'Study', 'Ideas'] as const;
export type TagType = typeof AVAILABLE_TAGS[number];

export interface NotePreviewProps {
  note: {
    title: string;
    tag: string;
    content: string;
    createdAt: Date;
    note: Note;
  };
}
export interface NotesClient {
 title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}