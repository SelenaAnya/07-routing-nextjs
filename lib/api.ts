import axios from 'axios';
import { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const serviceClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

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

interface NewNote {
  title: string;
  content?: string;
  tag: Tag;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const res = await axios.post<Note>("/notes", newNote);
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function updateNote(note: Note): Promise<Note> {
  const res = await axios.put<Note>(`/notes/${note.id}`, note);
  return res.data;
}

// export interface CreateNoteRequest {
//   title: string;
//   content: string;
//   tag?: string;
// }

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export interface FetchNotesService {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: string;
// }

// export interface NotesResponseProps {
//   notes: Note[];
//   totalPages: number;
// }

// export const fetchNotes = async (
//   page = 1,
//   query = "",
//   perPage = 12,
//   tag?: string
// ): Promise<FetchNotesService> => {
//   const params: Record<string, string | number> = { page, perPage };
//   if (query) params.search = query;
//   if (tag && tag !== `All`) params.tag = tag;
//   const res = await serviceClient.get<FetchNotesService>("/notes", { params });
//   return res.data;
// };

// export async function updateNote(
//   noteId: number,
//   noteData: CreateNoteRequest
// ): Promise<Note> {
//   const response = await serviceClient.put<Note>(`/notes/${noteId}`, noteData);
//   return response.data;
// }

// export async function createNote(noteData: CreateNoteRequest): Promise<Note> {
//   const response = await serviceClient.post<Note>('/notes', noteData);
//   return response.data;
// }

// export async function deleteNote(noteId: number): Promise<Note> {
//   const response = await serviceClient.delete<Note>(`/notes/${noteId}`);
//   return response.data;
// }

// export async function fetchNoteById(noteId: number): Promise<Note> {
//   const response = await serviceClient.get<Note>(`/notes/${noteId}`);
//   return response.data;
// }