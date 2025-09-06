import React from "react";

const featuresData = [
  {
    id: 1,
    title: "Simples e Intuitivo",
    description:
      "Interface clara para cadastrar doações, localizar pontos de coleta e acompanhar entregas.",
    style: {
      backgroundColor: "#FFFFFF",
      h3: { color: "#0D3C2D" },
      p: { color: "#334155" },
    },
  },
  {
    id: 2,
    title: "Seguro e Confiável",
    description:
      "Dados protegidos e processos transparentes para todos os participantes da rede.",
    style: {
      backgroundColor: "#E5E5E5",
      h3: { color: "#0D3C2D" },
      p: { color: "#000000" },
    },
  },
  {
    id: 3,
    title: "Acessível e Inclusivo",
    description:
      "Experiência pensada para diferentes perfis: produtores, ONGs e beneficiários.",
    style: {
      backgroundColor: "#4DA14C",
      h3: { color: "#FFFFFF" },
      p: { color: "#FFFFFF" },
    },
  },
  {
    id: 4,
    title: "Transparência de Impacto",
    description:
      "Acompanhe métricas de doações e resultados sociais em tempo real.",
    style: {
      backgroundColor: "#FFFFFF",
      h3: { color: "#0D3C2D" },
      p: { color: "#334155" },
    },
  },
  {
    id: 5,
    title: "Parcerias que Potencializam",
    description:
      "Integrações com organizações locais e voluntários para ampliar o alcance.",
    style: {
      backgroundColor: "#E5E5E5",
      h3: { color: "#0D3C2D" },
      p: { color: "#000000" },
    },
  },
  {
    id: 6,
    title: "Impacto Mensurável",
    description:
      "Redução do desperdício e apoio direto a quem precisa, com indicadores claros.",
    style: {
      backgroundColor: "#0D3C2D",
      h3: { color: "#FFFFFF" },
      p: { color: "#FFFFFF" },
    },
  },
];

export default function Features() {
  return (
    <>
      <style>
        {`
          html, body { margin: 0; padding: 0; }

          .hover-soft { transition: transform 180ms ease, box-shadow 180ms ease; }
          .hover-soft:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

          @media (hover: none) { .hover-soft:hover { transform: none; } }
          @media (max-width: 992px) { .hover-soft:hover { transform: none; } }

          .mobile-header-text { font-size: clamp(1.4rem, 3.4vw, 3rem) !important; line-height: 1.2; }
          .mobile-card-title { font-size: clamp(1.2rem, 2.1vw, 2.25rem) !important; line-height: 1.25; }
          .mobile-card-text { font-size: clamp(1rem, 1.6vw, 1.25rem) !important; line-height: 1.55; }
        `}
      </style>

      <div className="container-fluid vh-100 overflow-hidden d-flex flex-column">
        {/* Header */}
        <div className="row py-2 py-md-3 bg-white" style={{ marginBottom: 0 }}>
          <div className="col d-flex align-items-center justify-content-start text-dark mx-2 mx-md-4">
            <div>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-1 bg-white shadow-sm rounded-pill">
                <span className="text-success" style={{ fontSize: 18 }}>
                  🌱
                </span>
                <span className="text-muted fw-medium">Características</span>
              </div>
              <h2 className="display-6 display-4 display-md-6 w-100 mobile-header-text">
                O que torna o Grain & Grace diferente
              </h2>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className="row flex-grow-1 mx-2 mx-md-4 pb-2"
          style={{ backgroundColor: "#FFFFFF", marginTop: 0 }}
        >
          <div
            className="col-12 d-flex flex-column py-2 py-md-3 flex-grow-1"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div
              className="row gx-4 gx-md-5 gx-lg-6 gy-4 gy-md-4 gy-lg-5"
              style={{ flex: 1, display: "flex" }}
            >
              {featuresData.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="col-lg-4 col-md-6 col-12 d-flex"
                >
                  <div
                    className="card shadow-sm border-0 w-100 h-100 hover-soft"
                    style={{ ...feature.style, borderRadius: "24px" }}
                  >
                    <div className="card-body d-flex flex-column p-2 p-sm-3 p-md-4">
                      <h3
                        className="card-title mb-2 mb-md-3 fs-5 fs-md-4 fs-lg-2 fw-light mobile-card-title"
                        style={feature.style?.h3}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="card-text fs-6 fs-md-5 fs-lg-4 mb-0 fw-light mobile-card-text"
                        style={feature.style?.p}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="row gx-4 gx-md-5 gx-lg-6 gy-4 gy-md-4 gy-lg-5 mt-1 mt-md-2"
              style={{ flex: 1, display: "flex" }}
            >
              {featuresData.slice(3, 6).map((feature) => (
                <div
                  key={feature.id}
                  className="col-lg-4 col-md-6 col-12 d-flex"
                >
                  <div
                    className="card shadow-sm border-0 w-100 h-100 hover-soft"
                    style={{ ...feature.style, borderRadius: "24px" }}
                  >
                    <div className="card-body d-flex flex-column p-2 p-sm-3 p-md-4">
                      <h3
                        className="card-title mb-2 mb-md-3 fs-5 fs-md-4 fs-lg-2 fw-light mobile-card-title"
                        style={feature.style?.h3}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="card-text fs-6 fs-md-5 fs-lg-4 mb-0 fw-light mobile-card-text"
                        style={feature.style?.p}
                      >
                        {feature.description}
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
