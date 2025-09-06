import "./Header.css";
import logo from "../images/logo.png";
import user from "../images/usuário.png";

// removed stray JSX invocation that caused side effects during import

function Header() {
  return (
    <header>
      <div className="logoGG">
        <a className="gg" href="#">
          <img src={logo} alt="logo GG" />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Início</a>
          </li>
          <li>
            <a href="#">Sobre nós</a>
          </li>
          <li>
            <a href="#">Serviço</a>
          </li>
          <li>
            <a href="#">Características</a>
          </li>
          <li>
            <a href="#">Contato</a>
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
