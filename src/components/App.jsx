import { Layout } from './Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { Movies } from './Movies/Movies';
import { Home } from './Home/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieItem } from './MovieItem';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const App = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const searchOnWord = async () => {
      try {
        const response = await axios.get(
          `trending/all/day?api_key=9e294ba72e4332867e55d24684fee56c`
        );

        setTrends(response.data.results);
      } catch (error) {}
    };
    searchOnWord();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home trends={trends} />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieItem />} />
        </Route>
      </Routes>
    </div>
  );
};
