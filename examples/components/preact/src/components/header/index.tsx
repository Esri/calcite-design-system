import { useLocation } from "preact-iso";
import style from "./style.module.css";

const Header = () => {
  const { url } = useLocation();

  return (
    <header class={style.header}>
      <a href="/" class={style.logo}>
        <calcite-icon icon="brackets-curly" />
        <h1>Preact CLI</h1>
      </a>
      <nav>
        <a className={url === "/" ? style.active : ""} href="/">
          Home
        </a>
        <a className={url === "/profile" ? style.active : ""} href="/profile">
          Me
        </a>
        <a className={url === "/profile/john" ? style.active : ""} href="/profile/john">
          John
        </a>
      </nav>
    </header>
  );
};

export default Header;
