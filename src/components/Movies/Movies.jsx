import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const Movies = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchQuery = searchParams.get('query') ?? '';

  const handleInputChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setQuery(input);

    event.target.reset();
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `search/movie?api_key=9e294ba72e4332867e55d24684fee56c&query="${query}"&language=en-US&page=1`
        );
        setMovieList(response.data.results);
      } catch (error) {}
    };
    searchMovies();
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  }, [setSearchParams, query, searchParams]);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onInput={handleInputChange} />
        </label>
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      <ul>
        {movieList.map(movie => {
          return (
            <li key={movie.id} className={css.movies}>
              <Link
                to={`${movie.id}`}
                state={{ from: location }}
                className={css.moviesItem}
              >
                {movie.original_title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
