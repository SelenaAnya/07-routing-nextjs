'use client';

import React from "react";

type ErrorProps = {
    error: Error
};

const Error = ({ error }: ErrorProps) => {
    return (
        <div>
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
        </div>
    );
};
export default Error;