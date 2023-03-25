"use client";

import styles from "./Movie.module.css";
import Image from "next/image";
import ButtonBack from "@/components/ButtonBack";
import { MovieType } from "@/types/Movie";
import { searchMovieById } from "@/lib/graphql";
import { useState } from "react";

type Props = {
    imdbId: string;
};

export default function MoviePage({ imdbId }: Props) {
    const [movie, setMovie] = useState<MovieType | undefined>();

    searchMovieById(imdbId).then((movie) => {
        setMovie(movie);
    });

    console.log(movie);

    return (
        <>
            <ButtonBack />
            {movie && (
                <div className={styles.movie_page}>
                    <h1 className={styles.title}>{movie.Title}</h1>
                    <div className={styles.container}>
                        <Image
                            className={styles.image}
                            src={movie.Poster}
                            alt={movie.Title}
                            width={150}
                            height={220}
                        />
                        <div className={styles.info}>
                            <p className={styles.rating}>
                                {" "}
                                <b>Rating: </b> {movie.imdbRating}
                            </p>
                            <p className={styles.year}>
                                {" "}
                                <b>Year: </b> {movie.Year}
                            </p>

                            <p className={styles.actors}>
                                {" "}
                                <b>Actors: </b>
                                {movie.Actors}
                            </p>
                            <p className={styles.directors}>
                                {" "}
                                <b>Directors: </b>
                                {movie.Director}
                            </p>
                            <p className={styles.genres}>
                                {" "}
                                <b>Genres: </b>
                                {movie.Genre}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
