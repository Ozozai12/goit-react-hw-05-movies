import css from './Header.module.css';

import { StyledLink } from './Header.styled';

export const Header = () => {
  return (
    <nav className={css.header}>
      <StyledLink to="/" className={css.navigation}>
        Home
      </StyledLink>
      <StyledLink to="movies" className={css.navigation}>
        Movies
      </StyledLink>
    </nav>
  );
};
