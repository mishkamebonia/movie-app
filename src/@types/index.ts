export interface Bookmark {
  bookmarked: boolean;
  date: string;
  imdb: number;
  movieId: number;
  poster: string;
  title: string;
  type: string;
  uid: string;
}


export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieResponse<T> = {
  page: number;
  results: T[];
  total_pages: number,
  total_results: number
}