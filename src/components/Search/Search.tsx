"use client";

import styles from "./Search.module.css";
import { useState } from "react";
import { MovieItemType, MovieSearchItemType } from "@/types/Movie";
import { searchMovieByTitle, addMovie } from "@/lib/graphql";

type Props = {
    listId: string;
    movieListItems: MovieItemType[];
    removeMovieFromList: (removeMovieId: number, listId: number) => void;
};

export default function Search({
    listId,
    movieListItems,
    removeMovieFromList,
}: Props) {
    const [showModal, setShowModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [searchResults, setSearchResults] = useState<MovieSearchItemType[]>(
        []
    );

    const [addOrRemove, setAddOrRemove] = useState<boolean[]>([]);

    function handleSearch() {
        searchMovieByTitle(searchTerm).then((results) => {
            console.log(results);
            console.log(searchTerm);
            if (Array.isArray(results)) {
                setSearchResults(results);

                const addOrRemoveArray: boolean[] = [];

                results.forEach((result) => {
                    let found = false;
                    movieListItems.forEach((movieListItem) => {
                        if (movieListItem.imdb_id === result.imdbID) {
                            found = true;
                        }
                    });
                    addOrRemoveArray.push(found);
                });

                setAddOrRemove(addOrRemoveArray);
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
                            {searchResults.map((result, index) => (
                                <div
                                    key={result.imdbID}
                                    className={styles.itemcontainer}
                                >
                                    <div className={styles.itemlist}>
                                        {result.Title}
                                    </div>

                                    {addOrRemove[index] ? (
                                        <button
                                            onClick={() => {
                                                const movieListItem =
                                                    movieListItems.find(
                                                        (movieListItem) => {
                                                            return (
                                                                movieListItem.imdb_id ===
                                                                result.imdbID
                                                            );
                                                        }
                                                    );

                                                if (!movieListItem) return;

                                                removeMovieFromList(
                                                    movieListItem.id,
                                                    parseInt(listId)
                                                );
                                                setAddOrRemove(
                                                    addOrRemove.map((item, i) =>
                                                        i === index
                                                            ? false
                                                            : item
                                                    )
                                                );
                                            }}
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                addMovieToList(
                                                    listId,
                                                    result.imdbID
                                                );
                                                setAddOrRemove(
                                                    addOrRemove.map((item, i) =>
                                                        i === index
                                                            ? true
                                                            : item
                                                    )
                                                );
                                            }}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
