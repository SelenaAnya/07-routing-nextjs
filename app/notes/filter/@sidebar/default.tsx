import css from "./Sidebar.module.css";
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
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag === 'All' ? 'all' : tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NotesSidebar;