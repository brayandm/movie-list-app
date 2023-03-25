"use client";

import styles from "./Search.module.css";
import { useState } from "react";
import { MovieSearchItemType } from "@/types/Movie";
import { searchMovieByTitle, addMovie } from "@/lib/graphql";

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
