"use client";

type Props = {
    imdbId: string;
};

export default function MovieList({ imdbId }: Props) {
    return (
        <>
            <h1>Movie Page</h1>
            <p>Movie ID: {imdbId}</p>
        </>
    );
}
