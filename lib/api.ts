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

export const fetchNotes = async (
  currentPage: number = 1,
  search: string = '',
  perPage: number = 12,
  tag?: string
): Promise<NotesResponse> => {
  const params: Record<string, string | number> = {
    page: currentPage,
    perPage,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (tag?.trim() && tag !== 'All') {
    params.tag = tag.trim();
  }

  try {
    const response: AxiosResponse<NotesResponse> = await api.get('/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (noteData: CreateNoteRequest): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('/', noteData);
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/${noteId}`);
  return response.data;
};