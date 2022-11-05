import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const MovieItem = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
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
    const { poster_path, title, name, vote_average, overview } = movie;
    return (
      <>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title || name}
        />
        <h2>{title || name}</h2>
        <p>User Score: {Math.round(vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h4>Genres</h4>
      </>
    );
  }
};
