import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <a href="/" class={style.logo}>
      <calcite-icon icon="brackets-curly" />
      <h1>Preact CLI</h1>
    </a>
    <nav>
      <Link activeClassName={style.active} href="/">
        Home
      </Link>
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
      <Link activeClassName={style.active} href="/profile/john">
        John
      </Link>
    </nav>
  </header>
);

export default Header;
