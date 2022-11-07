import { Link, useLocation } from 'react-router-dom';
import css from './Home.module.css';

export const Home = ({ trends }) => {
  const location = useLocation();
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trends.map(movie => {
          return (
            <li key={movie.id} className={css.trends}>
              <Link
                to={`movies/${movie.id}`}
                state={{ from: location }}
                className={css.trendsItem}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
