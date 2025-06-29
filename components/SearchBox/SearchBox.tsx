import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function SearchBox({ onChange, value, error }: SearchBoxProps) {
    return (
      <>
        <input
          className={css.input}
          type="text"
          placeholder="Search notes"
          value={value}
          onChange={event => onChange(event.target.value)}
        />
        {error && <p className={css.error}>{error}</p>}
      </>
    );
  }
