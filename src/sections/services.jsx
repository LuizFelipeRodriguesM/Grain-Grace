import React from "react";
//import fieldTractors from "../../assets/field-tractors.png";

// Dados dos cards
const cardsData = [
  {
    id: 1,
    title: "Distribuição Justa",
    description:
      "As doações chegam de forma organizada às famílias e indivíduos que mais precisam.",
  },
  {
    id: 2,
    title: "Mapa Interativo",
    description:
      "Acompanhe em tempo real onde estão as doações e veja o impacto positivo que está sendo gerado.",
  },
  {
    id: 3,
    title: "Mapeamento de Coleta",
    description:
      "Localize os pontos de coleta mais próximos e organize o envio de alimentos de forma prática e rápida.",
  },
  {
    id: 4,
    title: "Cadastro de Doações",
    description:
      "Produtores rurais registram facilmente os alimentos disponíveis para doação, garantindo que nada em bom estado seja desperdiçado.",
  },
  {
    id: 5,
    title: "Notificações Inteligentes",
    description:
      "Receba alertas sobre alimentos próximos do vencimento e contribua para evitar desperdícios.",
  },
];

export default function Services() {
  return (
    <div className="container-fluid vh-100">
      {/* Header Section */}
      <div className="row h-25 bg-primary">
        <div className="col d-flex align-items-center justify-content-start text-white mx-5">
          <h2 className="display-6 w-90">
            Como o Grain & Grace funciona na prática - Conectamos produtores e
            comunidades em um ciclo de solidariedade e sustentabilidade.
          </h2>
        </div>
      </div>

      {/* Services Cards Section */}
      <div className="row h-75 bg-light">
        <div className="col-12 p-4">
          <div className="row g-4 justify-content-center">
            {cardsData.map((card) => (
              <div key={card.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card h-50 shadow-sm border-0">
                  <div className="card-body text-center">
                    <h5 className="card-title text-primary mb-3">
                      {card.title}
                    </h5>
                    <p className="card-text text-muted">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
