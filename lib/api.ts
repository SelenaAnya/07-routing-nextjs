import axios from 'axios';
import { Note, NewNoteData } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const serviceClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  searchText: string,
  page: number,
  tag?: string
): Promise<FetchNotesProps> {
  const res = await axios.get<FetchNotesProps>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      ...(tag && {tag}),
      page,
      perPage: 12,
    },
  });
  return res.data;
}

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const res = await serviceClient.post<Note>("/notes", newNote);
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res = await serviceClient.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const res = await serviceClient.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function updateNote(note: Note): Promise<Note> {
  const res = await serviceClient.put<Note>(`/notes/${note.id}`, note);
  return res.data;
}

export async function fetchTags(): Promise<string[]> {
  const res = await serviceClient.get<string[]>('/tags');
  return res.data;
}

