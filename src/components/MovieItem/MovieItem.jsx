import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import css from './MovieItem.module.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const MovieItem = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const response = await axios.get(
          `movie/${movieId}?api_key=9e294ba72e4332867e55d24684fee56c&language=en-US`
        );

        setMovie(response.data);
      } catch (error) {}
    };
    getMovieById();
  }, [movieId]);

  if (movie) {
    const { poster_path, title, name, vote_average, overview, genres } = movie;
    const getGenres = () => {
      return genres.map(genre => {
        return `${genre.name} `;
      });
    };

    return (
      <>
        <Link to={backLink} className={css.backLink}>
          <span className={css.backText}>Go back</span>
        </Link>

        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'
          }
          alt={title || name}
          className={css.poster}
        />
        <h2>{title || name}</h2>
        <p>User Score: {Math.round(vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p className={css.overview}>{overview}</p>
        <h4>Genres</h4>
        <p>{getGenres()}</p>
        <h5>Additional information</h5>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </>
    );
  }
};
