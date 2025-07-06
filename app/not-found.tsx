import css from './Home.module.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Note Not Found</h2>
      <p className={css.description}>The note you're looking for doesn't exist.</p>
      <Link href="/notes/filter/all">
        ← Back to notes
      </Link>
    </div>
  );
}

// export default function NotFound() {
//     return (
//         <div className={css.container}>
//             <h1 className={css.title}>404 - Page not found</h1>
//             <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
//         </div>
//     );
// }