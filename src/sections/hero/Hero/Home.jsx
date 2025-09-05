import "./Home.css";

import cesta from "../images/cestaverde.png";
import circulo from "../images/circulo.png";
import maca from "../images/maca.png";
import banana from "../images/banana.png";
import pera from "../images/pera.png";

function Hero() {
  return (
    <div className="hero">
      <div className="left-hero">
        <div className="left-text">
          <h1>
            Do campo para a <span className="background-mesa">mesa</span>
          </h1>
          <div className="backgoundmesa"></div>
          <p>
            Conectamos produtores rurais e comunidades carentes por meio da
            doação de alimentos que seriam descartados.
          </p>
        </div>
        <div className="buttons">
          <a className="button-doar" href="#">
            Quero doar
          </a>
          <a className="button-ajuda" href="#">
            Ajuda alimentar
          </a>
        </div>
      </div>

      <div className="right-hero">
        <img className="cesta" src={cesta} alt="Cesta de frutas" />
        <img className="circulo" src={circulo} alt="Ellipse branca" />
        <img className="maca" src={maca} alt="maçã" />
        <img className="banana" src={banana} alt="banana" />
        <img className="pera" src={pera} alt="pera" />
      </div>
    </div>
  );
}

export default Hero;