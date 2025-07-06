import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { tags } from '@/constants/constants'
export default function NotesSidebar() {

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

