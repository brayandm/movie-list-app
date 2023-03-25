"use client";

import styles from "./Search.module.css";
import { useState } from "react";
import { gql } from "graphql-request";
import { MovieItemType, MovieSearchItemType } from "@/types/Movie";
import { client } from "@/lib/client";
import { type } from "os";

const SearchMovieByTitle = gql`
    query SearchMovieByTitle($title: String!) {
        searchMovieByTitle(title: $title) {
            Poster
            Title
            Type
            Year
            imdbID
        }
    }
`;

const AddMovie = gql`
    mutation AddMovie($imdbId: String!, $listId: Int!) {
        addMovie(imdbId: $imdbId, listId: $listId) {
            id
            created_at
            imdb_id
            movie_list_id
        }
    }
`;

async function searchMovieByTitle(title: string) {
    const { searchMovieByTitle } = await client.request<{
        searchMovieByTitle: MovieSearchItemType[];
    }>(SearchMovieByTitle, {
        title: title,
    });

    return searchMovieByTitle;
}

async function addMovie(listId: number, imdbId: string) {
    const { addMovie } = await client.request<{
        addMovie: MovieItemType[];
    }>(AddMovie, {
        imdbId: imdbId,
        listId: listId,
    });

    return addMovie;
}

type Props = {
    listId: string;
};

export default function Search({ listId }: Props) {
    const [showModal, setShowModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [searchResults, setSearchResults] = useState<MovieSearchItemType[]>(
        []
    );

    function handleSearch() {
        searchMovieByTitle(searchTerm).then((results) => {
            console.log(results);
            console.log(searchTerm);
            if (Array.isArray(results)) {
                setSearchResults(results);
            }
        });
    }

    function addMovieToList(listId: string, imdbId: string) {
        console.log(listId, imdbId);
        addMovie(parseInt(listId), imdbId);
    }

    return (
        <>
            <button
                className={styles.button}
                onClick={() => setShowModal(!showModal)}
            >
                Search
            </button>
            {showModal && (
                <>
                    <div
                        className={styles.modal}
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className={styles.modalContent}>
                        <div className={styles.searchbar}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className={styles.button}
                                onClick={() => handleSearch()}
                            >
                                Search
                            </button>
                        </div>
                        <div className={styles.list}>
                            {searchResults.map((result) => (
                                <div
                                    key={result.imdbID}
                                    className={styles.itemcontainer}
                                >
                                    <div className={styles.itemlist}>
                                        {result.Title}
                                    </div>
                                    <button
                                        onClick={() =>
                                            addMovieToList(
                                                listId,
                                                result.imdbID
                                            )
                                        }
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
