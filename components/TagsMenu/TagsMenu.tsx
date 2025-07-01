'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const tag = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
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
                    // Close the menu if the focus is not on the menu item
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                        closeMenu();
                    }
                }}
            >
                Notes ▾
            </button>
            {/* {isOpen && (
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
            )} */}
        </div>
    );
}
export default TagsMenu;