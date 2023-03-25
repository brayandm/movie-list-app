"use client";

import styles from "./MovieList.module.css";
import { useState } from "react";
import { MovieListType } from "@/types/MovieList";
import { MovieItemType } from "@/types/Movie";
import Search from "../Search";
import { getMovieList, getMovieListItems, removeMovie } from "@/lib/graphql";
import Link from "next/link";

type Props = {
    listId: string;
};

export default function MovieList({ listId }: Props) {
    const [movieList, setMovieList] = useState<MovieListType | undefined>();

    const [movieListItems, setMovieListItems] = useState<MovieItemType[]>([]);

    getMovieList(parseInt(listId)).then((movieList) => {
        getMovieListItems(parseInt(listId)).then((movieListItems) => {
            setMovieList(movieList);
            setMovieListItems(movieListItems);
        });
    });

    function removeMovieFromList(removeMovieId: number, listId: number) {
        removeMovie(removeMovieId, listId);
        setMovieListItems(
            movieListItems.filter((movieListItem) => {
                return movieListItem.id !== removeMovieId;
            })
        );
    }

    console.log(movieListItems);

    return (
        <>
            <Search
                listId={listId}
                movieListItems={movieListItems}
                removeMovieFromList={removeMovieFromList}
            />
            {movieList && (
                <div className={styles.movieList}>
                    <h1>{movieList.name}</h1>
                    {movieListItems.map((movieListItem) => (
                        <Link
                            href={`/movie/${movieListItem.imdb_id}`}
                            key={movieListItem.id}
                        >
                            <div className={styles.movie_card}>
                                <h2>{movieListItem.movie.Title}</h2>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeMovieFromList(
                                            movieListItem.id,
                                            parseInt(listId)
                                        );
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
