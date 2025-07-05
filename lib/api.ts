import axios, { type AxiosResponse } from 'axios';
import { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
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

export async function fetchNotes(
  searchText: string,
  currentPage: number,
  tag?: string
): Promise<NotesResponse> {
  const res = await api.get<NotesResponseProps>("", {
    params: {
      ...(searchText && { search: searchText }),
      ...(tag && { tag }),
      page: currentPage,
      perPage: 10, 
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
  const response = await api.post<Note>('', noteData);
  return response.data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const response = await api.delete<Note>(`/${noteId}`);
  return response.data;
}

export async function fetchNoteById(noteId: number): Promise<Note> {
  const response = await api.get<Note>(`/${noteId}`);
  return response.data;
}