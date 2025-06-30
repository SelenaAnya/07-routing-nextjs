'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import { AVAILABLE_TAGS } from '../../types/note';

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className={css.menuContainer}>
            <button
                className={css.menuButton}
                onClick={toggleMenu}
                onBlur={(e) => {
                    // Закрываем меню, если фокус ушел не на элемент меню
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                        closeMenu();
                    }
                }}
            >
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {AVAILABLE_TAGS.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`}
                                className={css.menuLink}
                                onClick={closeMenu}
                            >
                                {tag === 'All' ? 'All notes' : tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}