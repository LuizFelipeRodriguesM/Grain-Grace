import "./Header.css";
import logo from "../images/logo.png";
import user from "../images/usuário.png";

// removed stray JSX invocation that caused side effects during import

function Header() {
  return (
    <header>
      <div className="logoGG">
        <a className="gg" href="#hero">
          <img src={logo} alt="logo GG" />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#hero">Início</a>
          </li>
          <li>
            <a href="#about">Sobre nós</a>
          </li>
          <li>
            <a href="#services">Serviços</a>
          </li>
          <li>
            <a href="#features">Reagir</a>
          </li>
          <li>
            <a href="#contact">Contato</a>
          </li>
        </ul>
      </nav>
      <div className="user">
        <a className="login" href="#">
          <img src={user} alt="User" />
        </a>
      </div>
    </header>
  );
}

export default Header;
