'use client';

import React from 'react';


type ErrorProps = {
    error: Error;
    reset: () => void;
};

export default function ErrorProps({ error, reset }: ErrorProps) {
    return (
        <div>
            <p>Could not fetch the list of notes. {error.message}</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
}