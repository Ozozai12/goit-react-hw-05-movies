import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { lazy, Suspense } from 'react';
import css from './App.module.css';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const Layout = lazy(() => import('./Layout/Layout'));
const Movies = lazy(() => import('./Movies/Movies'));
const Home = lazy(() => import('./Home/Home'));
const MovieItem = lazy(() => import('./MovieItem/MovieItem'));
const CastInfo = lazy(() => import('./CastInfo/CastInfo'));
const ReviewInfo = lazy(() => import('./ReviewInfo/ReviewInfo'));

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
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.section}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home trends={trends} />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieItem />}>
              <Route index path="cast" element={<CastInfo />} />
              <Route index path="reviews" element={<ReviewInfo />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
};
