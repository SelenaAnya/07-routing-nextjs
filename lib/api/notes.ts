import axios from 'axios';
import { Note, CreateNoteData, UpdateNoteData } from '@/types/note';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api-url.com';

// Function for serialising dates
function serializeNote(note: any): Note {
    return {
        ...note,
        createdAt: note.createdAt instanceof Date
            ? note.createdAt.toISOString()
            : note.createdAt,
        updatedAt: note.updatedAt instanceof Date
            ? note.updatedAt.toISOString()
            : note.updatedAt,
    };
}

export async function fetchNotes(tag?: string): Promise<Note[]> {
    try {
        const params = tag && tag !== 'All' ? { tag } : {};
        const response = await axios.get(`${API_BASE_URL}/notes`, { params });

        return response.data.map(serializeNote);
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

export async function fetchNoteById(id: string): Promise<Note> {
    try {
        const response = await axios.get(`${API_BASE_URL}/notes/${id}`);
        return serializeNote(response.data);
    } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
    }
}

export async function createNote(noteData: CreateNoteData): Promise<Note> {
    try {
        const response = await axios.post(`${API_BASE_URL}/notes`, noteData);
        return serializeNote(response.data);
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

export async function updateNote(noteData: UpdateNoteData): Promise<Note> {
    try {
        const { id, ...data } = noteData;
        const response = await axios.put(`${API_BASE_URL}/notes/${id}`, data);
        return serializeNote(response.data);
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

export async function deleteNote(id: number): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/notes/${id}`);
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
}

export async function fetchTags(): Promise<string[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/tags`);
        return ['All', ...response.data];
    } catch (error) {
        console.error('Error fetching tags:', error);
        return ['All', 'Work', 'Personal', 'Study', 'Ideas'];
    }
}


export const notesApi = async () => ({
    getNoteById: async (id: string) => {
        try {
            const response = await fetchNoteById(id);
            return response;
        } catch (error) {
            console.error('Error fetching note by ID:', error);
            throw error;
        }
    }
});