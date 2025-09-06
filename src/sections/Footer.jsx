import React from "react";

export default function Footer() {
  return (
    <>
      <style>
        {`
          .footer-link {
            color: #ffffff;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .footer-link:hover {
            color: #4DA14C;
            text-decoration: none;
          }

          .social-link {
            color: #4DA14C;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .social-link:hover {
            color: #0D3C2D;
            transform: translateY(-2px);
          }

          .footer-gradient {
            background: linear-gradient(135deg, #0D3C2D 0%, #4DA14C 100%);
          }


          .footer-text {
            font-size: clamp(0.9rem, 1.5vw, 1.1rem);
            line-height: 1.6;
          }

          .footer-title {
            font-size: clamp(1.1rem, 2vw, 1.3rem);
            font-weight: 600;
            color: #ffffff;
          }

          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          @media (max-width: 768px) {
            .footer-padding {
              padding: 2rem 1rem;
            }
          }
        `}
      </style>

      <footer className="footer-gradient text-white">
        <div className="container-fluid py-5">
          <div className="row mx-2 mx-md-4">
            <div className="col-12">
              <div className="footer-padding">
                <div className="row g-4 g-md-5">
                  {/* Coluna 1 - Sobre */}
                  <div className="col-lg-4 col-md-6">
                    <div className="mb-4">
                      <h3 className="footer-title mb-3">Grain & Grace</h3>
                      <p className="footer-text text-white mb-3">
                        Conectamos produtores rurais, pontos de coleta e
                        famílias em situação de vulnerabilidade, criando uma
                        rede que transforma excedentes em oportunidades de
                        inclusão social e sustentabilidade.
                      </p>
                      <div className="d-flex gap-3 mt-3">
                        <a
                          href="#"
                          className="social-link"
                          aria-label="Facebook"
                        >
                          <i className="bi bi-facebook fs-5"></i>
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          aria-label="Instagram"
                        >
                          <i className="bi bi-instagram fs-5"></i>
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          aria-label="LinkedIn"
                        >
                          <i className="bi bi-linkedin fs-5"></i>
                        </a>
                        <a
                          href="#"
                          className="social-link"
                          aria-label="WhatsApp"
                        >
                          <i className="bi bi-whatsapp fs-5"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2 - Links Rápidos */}
                  <div className="col-lg-2 col-md-6">
                    <h4 className="footer-title mb-3">Links Rápidos</h4>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a href="#hero" className="footer-link">
                          Início
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#about" className="footer-link">
                          Sobre Nós
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#services" className="footer-link">
                          Como Funciona
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#contact" className="footer-link">
                          Contato
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Coluna 3 - Serviços */}
                  <div className="col-lg-3 col-md-6">
                    <h4 className="footer-title mb-3">Serviços</h4>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a href="#" className="footer-link">
                          Cadastro de Doações
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#" className="footer-link">
                          Mapeamento de Coleta
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#" className="footer-link">
                          Distribuição Justa
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#" className="footer-link">
                          Mapa Interativo
                        </a>
                      </li>
                      <li className="mb-2">
                        <a href="#" className="footer-link">
                          Notificações
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Coluna 4 - Contato */}
                  <div className="col-lg-3 col-md-6">
                    <h4 className="footer-title mb-3">Contato</h4>
                    <div className="d-flex align-items-start mb-2">
                      <i className="bi bi-envelope-fill text-success me-2 mt-1"></i>
                      <a
                        href="mailto:graingrace.suporte@gmail.com"
                        className="footer-link"
                      >
                        graingrace.suporte@gmail.com
                      </a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <i className="bi bi-geo-alt-fill text-success me-2 mt-1"></i>
                      <span className="text-white footer-text">
                        São Paulo, Brasil
                      </span>
                    </div>
                  </div>
                </div>

                {/* Linha divisória */}
                <hr
                  className="my-4"
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                />

                {/* Copyright */}
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <p className="mb-0 text-white footer-text">
                      © 2024 Grain & Grace. Todos os direitos reservados.
                    </p>
                  </div>
                  <div className="col-md-6 text-md-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
