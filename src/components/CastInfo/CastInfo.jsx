import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const CastInfo = () => {
  const [credits, setCredits] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const response = await axios.get(
          `movie/${movieId}/credits?api_key=9e294ba72e4332867e55d24684fee56c&language=en-US&page=1`
        );

        setCredits(response.data.cast);
      } catch (error) {}
    };
    getMovieById();
  }, [movieId]);

  if (!credits) {
    return;
  }

  return (
    <ul>
      {credits.map(credit => {
        return (
          <li key={credit.id}>
            <img
              src={
                credit.profile_path
                  ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                  : 'https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'
              }
              alt={credit.name || credit.original_name}
            />
            <p>
              <b>{credit.name || credit.original_name}</b>
            </p>
            <p>Character: {credit.character}</p>
          </li>
        );
      })}
    </ul>
  );
};
