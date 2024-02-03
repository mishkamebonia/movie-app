// ? API key
export const apiKey = import.meta.env.VITE_API_KEY;

console.log(import.meta.env)
// ? poster API
export const posterApi = `https://image.tmdb.org/t/p/w500`

// ? movies API
export const movieApi = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
export const newMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

// ? series API
export const seriesApi = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`

export const pageSeriesApi = `/series?page=`

// ? search APIs
export const searchMovieApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`
export const searchSeriesApi = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}`
export const searchMovieAndSeriesApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}`

// ? trailer APIs
// * first part
export const movieUrl = `https://api.themoviedb.org/3/movie/`
export const SerieUrl = `https://api.themoviedb.org/3/tv/`
// * last part
export const videoUrl = `/videos?api_key=${apiKey}&language=en-US`