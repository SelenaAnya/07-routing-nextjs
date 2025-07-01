import css from "./SidebarNotes.module.css";
import Link from "next/link";

const NotesSidebar = async () => {
    const tags = [
        { name: 'All', slug: '' },
        { name: 'Work', slug: 'work' },
        { name: 'Personal', slug: 'personal' },
        { name: 'Travel', slug: 'travel' },
        { name: 'Health', slug: 'health' },
    ];

    return (
        <ul className={css.menuList}>
            {tags.map(tag => (
                <li key={tag.name} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${tag.name === 'All' ? 'all' : tag.slug}`}
                        className={css.menuLink}
                    >
                        {tag.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NotesSidebar;