import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './ReviewInfo.module.css';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const ReviewInfo = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const response = await axios.get(
          `movie/${movieId}/reviews?api_key=9e294ba72e4332867e55d24684fee56c&language=en-US&page=1`
        );

        setReviews(response.data.results);
      } catch (error) {}
    };
    getMovieById();
  }, [movieId]);

  if (!reviews) {
    return;
  }

  return reviews.length > 0 ? (
    <ul>
      {reviews.map(review => {
        return (
          <li key={review.id} className={css.reviewItem}>
            <p>{review.author}</p>
            <p>"{review.content}"</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>There are no reviews at the moment.</p>
  );
};
