import { gql } from "graphql-request";
import { client } from "@/lib/client";
import { MovieItemType, MovieSearchItemType, MovieType } from "@/types/Movie";

import { MovieListType } from "@/types/MovieList";

import { MY_EMAIL_KEY } from "@/constants/email";

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

const RemoveMovie = gql`
    mutation RemoveMovie($removeMovieId: Int!, $listId: Int!) {
        removeMovie(id: $removeMovieId, listId: $listId)
    }
`;

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

const DeleteList = gql`
    mutation DeleteList($deleteListId: Int!) {
        deleteList(id: $deleteListId)
    }
`;

const SearchMovieById = gql`
    query SearchMovieById($searchMovieByIdId: String!) {
        searchMovieById(id: $searchMovieByIdId) {
            Title
            Year
            Rated
            Genre
            Director
            Actors
            imdbRating
            imdbID
            Poster
            imdbRating
        }
    }
`;

export async function getMovieList(listId: number) {
    const { getMovieList } = await client.request<{
        getMovieList: MovieListType;
    }>(GetMovieList, {
        getMovieListId: listId,
    });

    return getMovieList;
}

export async function getMovieListItems(listId: number) {
    const { getMovieListItems } = await client.request<{
        getMovieListItems: MovieItemType[];
    }>(GetMovieListItems, {
        listId: listId,
    });

    return getMovieListItems;
}

export function removeMovie(removeMovieId: number, $listId: number) {
    client.request(RemoveMovie, {
        removeMovieId: removeMovieId,
        listId: $listId,
    });
}

export async function getMovieLists() {
    const { getMovieLists } = await client.request<{
        getMovieLists: MovieListType[];
    }>(GetMovieLists, {
        email: MY_EMAIL_KEY,
    });

    return getMovieLists;
}

export async function createList(name: string) {
    const { createList } = await client.request<{
        createList: MovieListType;
    }>(CreateList, {
        input: {
            name: name,
            email: MY_EMAIL_KEY,
        },
    });

    return createList;
}

export async function searchMovieByTitle(title: string) {
    const { searchMovieByTitle } = await client.request<{
        searchMovieByTitle: MovieSearchItemType[];
    }>(SearchMovieByTitle, {
        title: title,
    });

    return searchMovieByTitle;
}

export async function addMovie(listId: number, imdbId: string) {
    const { addMovie } = await client.request<{
        addMovie: MovieItemType[];
    }>(AddMovie, {
        imdbId: imdbId,
        listId: listId,
    });

    return addMovie;
}

export async function deleteList(deleteListId: number) {
    const { deleteList } = await client.request<{
        deleteList: MovieItemType[];
    }>(DeleteList, {
        deleteListId: deleteListId,
    });

    return deleteList;
}

export async function searchMovieById(searchMovieByIdId: string) {
    const { searchMovieById } = await client.request<{
        searchMovieById: MovieType;
    }>(SearchMovieById, {
        searchMovieByIdId: searchMovieByIdId,
    });

    return searchMovieById;
}
