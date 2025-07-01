import css from './SearchBox.module.css';

interface SearchBoxProps {
  // value: string;
  onChange: (value: string) => void;
  searchQuery: string;
}

export default function SearchBox({ onChange, searchQuery }: SearchBoxProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchQuery}
      onChange={handleInputChange}
    />

  );
}
