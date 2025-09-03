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
          .hover-soft {
            transition: transform 180ms ease, box-shadow 180ms ease;
          }

          .hover-soft:hover {
            transform: translateY(-2px) scale(1.01);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          }
        `}
      </style>
      <div className="container-fluid vh-100">
        {/* Header Section */}
        <div className="row h-25 bg-white">
          <div className="col d-flex align-items-center justify-content-start text-dark mx-4">
            <h2 className="display-6 w-90">
              Como o Grain & Grace funciona na prática - Conectamos produtores e
              comunidades em um ciclo de solidariedade e sustentabilidade.
            </h2>
          </div>
        </div>

        {/* Services Cards Section */}
        <div
          className="row h-75 mx-4"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="col-12 h-100 d-flex flex-column py-4">
            {/* Primeira linha - 3 cards */}
            <div className="row h-50 g-6 justify-content-center mb-4">
              {cardsData.slice(0, 3).map((card) => (
                <div
                  key={card.id}
                  className="col-lg-4 col-md-4 col-sm-12 d-flex"
                >
                  <div
                    className="card h-100 shadow-sm border-0 w-100 rounded-8 hover-soft"
                    style={{ ...card.style, borderRadius: "24px" }}
                  >
                    <div className="card-body d-flex flex-column py-4">
                      <h3
                        className="card-title mb-4 fs-1 fw-light"
                        style={card.style?.h3}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="card-text fs-3 mb-2 fw-light"
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
            <div className="row h-50 g-4 justify-content-center">
              {cardsData.slice(3, 5).map((card) => (
                <div
                  key={card.id}
                  className="col-lg-6 col-md-6 col-sm-12 d-flex"
                >
                  <div
                    className="card h-100 shadow-sm border-0 w-100 rounded-8 hover-soft"
                    style={{ ...card.style, borderRadius: "24px" }}
                  >
                    <div className="card-body d-flex flex-column py-4">
                      <h3
                        className="card-title mb-4 fs-1 fw-light"
                        style={card.style?.h3}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="card-text fs-3 mb-2 fw-light"
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
