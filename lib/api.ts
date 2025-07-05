import axios, { type AxiosResponse } from 'axios';
import { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface NotesResponseProps {
  notes: Note[];
  totalPages: number;
}

// Fixed parameter order: page, search, perPage, tag
export async function fetchNotes(
  page: number = 1,
  search: string = '',
  perPage: number = 10,
  tag?: string
): Promise<NotesResponse> {
  const res = await api.get<NotesResponseProps>("", {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });
  return res.data;
}

interface noteData {
  title: string;
  content: string;
  tag?: string;
  totalPages: number;
}

export async function createNote(noteData: CreateNoteRequest): Promise<Note> {
  const response = await axios.post<Note>('/notes', noteData);
  return response.data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
}