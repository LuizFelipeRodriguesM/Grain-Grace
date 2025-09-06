import React from "react";
const cardsData = [
  {
    id: 1,
    title: "Distribuição Justa",
    description:
      "As doações chegam de forma organizada às famílias e indivíduos que mais precisam.",
    style: {
      backgroundColor: "#0D3C2D",
      h3: {
        color: "#FFFFFF",
      },
      p: {
        color: "#FFFFFF",
      },
    },
  },
  {
    id: 2,
    title: "Mapa Interativo",
    description:
      "Acompanhe em tempo real onde estão as doações e veja o impacto positivo que está sendo gerado.",
    style: {
      backgroundColor: "#4DA14C",
      h3: {
        color: "#FFFFFF",
      },
      p: {
        color: "#FFFFFF",
      },
    },
  },
  {
    id: 3,
    title: "Mapeamento de Coleta",
    description:
      "Localize os pontos de coleta mais próximos e organize o envio de alimentos de forma prática e rápida.",
    style: {
      backgroundColor: "#E5E5E5",
      h3: {
        color: "#000000",
      },
      p: {
        color: "#000000",
      },
    },
  },
  {
    id: 4,
    title: "Cadastro de Doações",
    description:
      "Produtores rurais registram facilmente os alimentos disponíveis para doação, garantindo que nada em bom estado seja desperdiçado.",
    style: {
      backgroundColor: "#E5E5E5",
      h3: {
        color: "#000000",
      },
      p: {
        color: "#000000",
      },
    },
  },
  {
    id: 5,
    title: "Notificações Inteligentes",
    description:
      "Receba alertas sobre alimentos próximos do vencimento e contribua para evitar desperdícios, promovendo consumo sustentável.",
    style: {
      backgroundColor: "#0D3C2D",
      h3: {
        color: "#FFFFFF",
      },
      p: {
        color: "#FFFFFF",
      },
    },
  },
];

export default function Services() {
  return (
    <>
      <style>
        {`
          /* Removed global overflow/height locks to allow page scroll and interactions */

          .hover-soft {
            transition: transform 180ms ease, box-shadow 180ms ease;
          }

          .hover-soft:hover {
            transform: translateY(-2px) scale(1.01);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          }

          /* Disable hover scale on touch devices and small screens to avoid overlap */
          @media (hover: none) {
            .hover-soft:hover {
              transform: none;
            }
          }
          @media (max-width: 992px) {
            .hover-soft:hover {
              transform: none;
            }
          }

          /* Fluid typography */
          .mobile-header-text {
            font-size: clamp(1.25rem, 3.2vw, 3rem) !important;
            line-height: 1.2;
          }
          .mobile-card-title {
            font-size: clamp(1.35rem, 2.2vw, 2.75rem) !important;
            line-height: 1.2;
          }
          .mobile-card-text {
            font-size: clamp(1.2rem, 1.8vw, 2rem) !important;
            line-height: 1.5;
          }
        `}
      </style>
      <div
        id="services"
        className="container-fluid vh-100 overflow-hidden d-flex flex-column"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Header Section */}
        <div
          className="row py-2 py-md-3"
          style={{
            marginBottom: 0,
            backgroundColor: "transparent",
            position: "relative",
            zIndex: 20,
          }}
        >
          <div className="col d-flex align-items-center justify-content-start text-dark mx-2 mx-md-4">
            <h2 className="display-6 display-4 display-md-6 w-100 mobile-header-text">
              Como o Grain & Grace funciona na prática - Conectamos produtores e
              comunidades em um ciclo de solidariedade e sustentabilidade.
            </h2>
          </div>
        </div>

        {/* Services Cards Section */}
        <div
          className="row flex-grow-1 mx-2 mx-md-4 pb-2"
          style={{
            backgroundColor: "transparent",
            marginTop: 0,
          }}
        >
          <div
            className="col-12 d-flex flex-column py-2 py-md-3 flex-grow-1"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Primeira linha - 3 cards */}
            <div
              className="row gx-4 gx-md-5 gx-lg-6 gy-4 gy-md-4 gy-lg-5 mb-2 mb-md-3"
              style={{ flex: 1, display: "flex" }}
            >
              {cardsData.slice(0, 3).map((card) => (
                <div key={card.id} className="col-lg-4 col-md-6 col-12 d-flex">
                  <div
                    className="card shadow-sm border-0 w-100 h-100 hover-soft"
                    style={{
                      ...card.style,
                      borderRadius: "24px",
                    }}
                  >
                    <div className="card-body d-flex flex-column p-2 p-sm-3 p-md-4">
                      <h3
                        className="card-title mb-3 mb-md-4 fs-5 fs-md-4 fs-lg-1 fw-light mobile-card-title"
                        style={card.style?.h3}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="card-text fs-6 fs-md-5 fs-lg-3 mb-2 fw-light mobile-card-text"
                        style={card.style?.p}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Segunda linha - 2 cards */}
            <div
              className="row gx-4 gx-md-5 gy-4 gy-md-4 mt-1 mt-md-2"
              style={{ flex: 1, display: "flex" }}
            >
              {cardsData.slice(3, 5).map((card) => (
                <div key={card.id} className="col-lg-6 col-md-6 col-12 d-flex">
                  <div
                    className="card shadow-sm border-0 w-100 h-100 hover-soft"
                    style={{
                      ...card.style,
                      borderRadius: "24px",
                    }}
                  >
                    <div className="card-body d-flex flex-column p-2 p-sm-3 p-md-4">
                      <h3
                        className="card-title mb-3 mb-md-4 fs-5 fs-md-4 fs-lg-1 fw-light mobile-card-title"
                        style={card.style?.h3}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="card-text fs-6 fs-md-5 fs-lg-3 mb-2 fw-light mobile-card-text"
                        style={card.style?.p}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}