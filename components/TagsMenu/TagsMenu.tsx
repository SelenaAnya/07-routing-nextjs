'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState } from 'react';
import { tags } from '@/constants/constants'

// const tags: string[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleTagClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes &#9662;
      </button>
      {isMenuOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleTagClick}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


