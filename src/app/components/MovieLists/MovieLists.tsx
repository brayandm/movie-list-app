"use client";

import styles from "./MovieLists.module.css";
import { gql } from "graphql-request";
import { client } from "@/lib/client";
import { MY_EMAIL_KEY } from "@/constants/email";
import { useState } from "react";
import { MovieList } from "@/types/MovieList";
import { useRef } from "react";

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

const CreateList = gql`
    mutation CreateList($input: CreateListInput!) {
        createList(input: $input) {
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

async function createList(name: string) {
    const { createList } = await client.request<{
        createList: MovieList;
    }>(CreateList, {
        input: {
            name: name,
            email: MY_EMAIL_KEY,
        },
    });

    return createList;
}

export default function MovieLists() {
    const [movieList, setMovieList] = useState<MovieList[]>([]);

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
            {movieList.reverse().map((movieList) => (
                <div className={styles.movie_list} key={movieList.id}>
                    <h2> {movieList.name} </h2>
                </div>
            ))}
        </main>
    );
}
