"use client";

type ErrorProps = {
    error: Error;
    reset(): void;
};

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div>
            <h2>Movies did not load!</h2>
        </div>
    );
}
