"use client";

import styles from "./MovieList.module.css";
import { gql } from "graphql-request";
import { client } from "@/lib/client";
import { useState } from "react";
import { MovieListType } from "@/types/MovieList";
import { MovieItemType } from "@/types/Movie";
import Search from "../Search";

const GetMovieList = gql`
    query GetMovieList($getMovieListId: Int!) {
        getMovieList(id: $getMovieListId) {
            id
            created_at
            name
            email
        }
    }
`;

const GetMovieListItems = gql`
    query GetMovieListItems($listId: Int!) {
        getMovieListItems(listId: $listId) {
            id
            created_at
            imdb_id
            movie_list_id
            movie {
                Title
                Year
                Rated
                Genre
                Director
                Actors
                imdbRating
                imdbID
            }
        }
    }
`;

async function getMovieList(listId: number) {
    const { getMovieList } = await client.request<{
        getMovieList: MovieListType;
    }>(GetMovieList, {
        getMovieListId: listId,
    });

    return getMovieList;
}

async function getMovieListItems(listId: number) {
    const { getMovieListItems } = await client.request<{
        getMovieListItems: MovieItemType[];
    }>(GetMovieListItems, {
        listId: listId,
    });

    return getMovieListItems;
}

const RemoveMovie = gql`
    mutation RemoveMovie($removeMovieId: Int!, $listId: Int!) {
        removeMovie(id: $removeMovieId, listId: $listId)
    }
`;

function removeMovie(removeMovieId: number, $listId: number) {
    client.request(RemoveMovie, {
        removeMovieId: removeMovieId,
        listId: $listId,
    });
}

type Props = {
    listId: string;
};

export default function MovieList({ listId }: Props) {
    const [movieList, setMovieList] = useState<MovieListType | undefined>();

    const [movieListItems, setMovieListItems] = useState<MovieItemType[]>([]);

    getMovieList(parseInt(listId)).then((movieList) => {
        setMovieList(movieList);
    });

    getMovieListItems(parseInt(listId)).then((movieListItems) => {
        setMovieListItems(movieListItems);
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
            <Search listId={listId} />
            {movieList && (
                <div className={styles.movieList}>
                    <h1>{movieList.name}</h1>
                    {movieListItems.map((movieListItem) => (
                        <div
                            className={styles.movie_card}
                            key={movieListItem.id}
                        >
                            <h2>{movieListItem.movie.Title}</h2>
                            <button
                                onClick={() =>
                                    removeMovieFromList(
                                        movieListItem.id,
                                        parseInt(listId)
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
