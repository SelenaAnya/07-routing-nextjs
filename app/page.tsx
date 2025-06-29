// app/page.tsx
import Link from 'next/link';
import css from './page.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <section className={css.hero}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.subtitle}>
            Your personal space for organizing thoughts, ideas, and important information
          </p>
          <div className={css.cta}>
            <Link href="/notes/filter" className={css.ctaButton}>
              Start Taking Notes
            </Link>
          </div>
        </section>

        <p className={css.description}>
          NoteHub is a simple yet powerful note-taking application that helps you capture,
          organize, and manage your thoughts efficiently. Whether you're jotting down quick
          reminders, planning your day, or brainstorming ideas, NoteHub provides the perfect
          digital workspace for all your note-taking needs.
        </p>

        <section className={css.features}>
          <div className={css.feature}>
            <h3 className={css.featureTitle}>📝 Easy Note Creation</h3>
            <p className={css.featureDescription}>
              Create notes quickly with our intuitive interface. Add titles, content,
              and organize with tags.
            </p>
          </div>

          <div className={css.feature}>
            <h3 className={css.featureTitle}>🏷️ Smart Organization</h3>
            <p className={css.featureDescription}>
              Categorize your notes with tags like Work, Personal, Shopping, and more
              for easy filtering and searching.
            </p>
          </div>

          <div className={css.feature}>
            <h3 className={css.featureTitle}>🔍 Powerful Search</h3>
            <p className={css.featureDescription}>
              Find what you need instantly with our search functionality.
              Filter by tags or search through content.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}