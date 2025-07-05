import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
  error?: string;
}

export default function SearchBox({ value, onSearch, error }: SearchBoxProps) {
  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
      />
      {error && <p className={css.error}>{error}</p>}
    </>
  );
}