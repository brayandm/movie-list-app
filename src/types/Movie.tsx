export type MovieItemType = {
    id: number;
    created_at: string;
    imdb_id: string;
    movie_list_id: number;
    movie: MovieType;
};

export type MovieType = {
    Title: string;
    Year: string;
    Rated: string;
    Genre: string;
    Director: string;
    Actors: string;
    imdbRating: string;
    imdbID: string;
};

export type MovieSearchItemType = {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
};
