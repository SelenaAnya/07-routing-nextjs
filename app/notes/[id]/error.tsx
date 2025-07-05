'use client';

import css from '../../Error/Error.module.css';

type ErrorProps = {
    error: Error
};

export default function Error({ error }: ErrorProps) {
    return (
        <div>
            <h1 className={css.errorText}>Something went wrong</h1>
            <p>{error.message}</p>
        </div>
    );
};
