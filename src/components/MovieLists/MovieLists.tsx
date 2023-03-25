"use client";

import styles from "./MovieLists.module.css";
import { useState } from "react";
import { MovieListType } from "@/types/MovieList";
import { useRef } from "react";
import Link from "next/link";
import { getMovieLists, createList, deleteList } from "@/lib/graphql";

export default function MovieLists() {
    const [movieList, setMovieList] = useState<MovieListType[]>([]);

    const movieListName = useRef<HTMLInputElement>(null);

    getMovieLists().then((data) => {
        setMovieList(data);
    });

    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (movieListName.current) {
            createList(movieListName.current.value).then((data) => {
                setMovieList([...movieList, data]);
            });
        }
    }

    return (
        <main className={styles.main}>
            <h1> Movie lists: </h1>
            <form className={styles.form} onSubmit={(e) => handleOnSubmit(e)}>
                <input
                    ref={movieListName}
                    className={styles.input}
                    type="text"
                    placeholder="Movie list name"
                />
                <button className={styles.button} type="submit">
                    Create
                </button>
            </form>
            {movieList.length ? (
                movieList.reverse().map((movieList) => (
                    <Link href={`/my-lists/${movieList.id}`} key={movieList.id}>
                        <div className={styles.movie_list}>
                            <h2> {movieList.name} </h2>
                            <button
                                className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteList(movieList.id);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </Link>
                ))
            ) : (
                <div>
                    <br />
                    <br />
                    <h2> No movie lists yet </h2>
                </div>
            )}
        </main>
    );
}
