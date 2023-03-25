"use client";

import styles from "./MovieList.module.css";
import { gql } from "graphql-request";
import { client } from "@/lib/client";
import { useState } from "react";
import { MovieListType } from "@/types/MovieList";

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

async function getMovieList(listId: number) {
    const { getMovieList } = await client.request<{
        getMovieList: MovieListType;
    }>(GetMovieList, {
        getMovieListId: listId,
    });

    return getMovieList;
}

type Props = {
    listId: string;
};

export default function MovieList({ listId }: Props) {
    const [movieList, setMovieList] = useState<MovieListType | undefined>();

    getMovieList(parseInt(listId)).then((movieList) => {
        setMovieList(movieList);
    });

    return (
        <>
            {movieList && (
                <div className={styles.movieList}>
                    <h1>{movieList.name}</h1>
                </div>
            )}
        </>
    );
}
