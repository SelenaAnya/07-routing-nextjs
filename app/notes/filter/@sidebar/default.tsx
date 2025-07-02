import css from "./SidebarNotes.module.css";
import Link from "next/link";

export default function NotesSidebar() {
    const tags = [
        'All',
        'Work',
        'Personal',
        'Trave',
        'Health',
    ];

    return (
        <ul className={css.menuList}>
            {tags.map(tag => (
                <li key={tag} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

