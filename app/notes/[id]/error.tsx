'use client';

type ErrorProps = {
    error: Error
};

export default function Error({ error }: ErrorProps) {
    return (
        <div>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
        </div>
    );
};
