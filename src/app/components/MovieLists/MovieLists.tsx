"use client";

import styles from "./MovieLists.module.css";
import { gql } from "graphql-request";
import { client } from "@/lib/client";
import { MY_EMAIL_KEY } from "@/constants/email";
import { useState } from "react";
import { MovieList } from "@/types/MovieList";

const GetMovieLists = gql`
    query GetMovieLists($email: String!) {
        getMovieLists(email: $email) {
            id
            created_at
            name
            email
        }
    }
`;

async function getMovieLists() {
    const { getMovieLists } = await client.request<{
        getMovieLists: MovieList[];
    }>(GetMovieLists, {
        email: MY_EMAIL_KEY,
    });

    return getMovieLists;
}

export default function MovieLists() {
    const [movieList, setMovieList] = useState<MovieList[]>([]);

    getMovieLists().then((data) => {
        setMovieList(data);
    });

    return (
        <main className={styles.main}>
            <h1> Movie lists: </h1>
            {movieList.map((movieList) => (
                <div className={styles.movie_list} key={movieList.id}>
                    <h2> {movieList.name} </h2>
                </div>
            ))}
        </main>
    );
}
