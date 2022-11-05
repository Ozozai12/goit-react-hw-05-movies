// import { MovieItem } from 'components/MovieItem';
import { Link } from 'react-router-dom';

export const Home = ({ trends }) => {
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {trends.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`}>{movie.title || movie.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
