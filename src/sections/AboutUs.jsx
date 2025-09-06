import React from "react";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="container d-flex flex-column flex-md-row align-items-start gap-5"
      style={{ paddingBottom: "8rem", position: "relative", zIndex: 2 }}
    >
      {/* Texto */}
      <div
        className="col-md-5 text-start"
        style={{
          lineHeight: 1.8,
          color: "#1a202c",
          textAlign: "left",
          paddingRight: "2rem",
          marginTop: "0",
        }}
      >
        <h2
          className="mb-3"
          style={{ marginLeft: "-2rem", marginTop: "0", color: "#000000" }}
        >
          Quem somos
        </h2>
        <p className="fs-5" style={{ marginLeft: "-2rem", marginTop: "0" }}>
          O <strong>Grain & Grace</strong> nasceu para reduzir o desperdício de
          alimentos no campo e gerar impacto social positivo. Conectamos
          produtores rurais, pontos de coleta e famílias em situação de
          vulnerabilidade, criando uma rede que transforma excedentes em
          oportunidades. Nosso compromisso é garantir que alimentos em bom
          estado cheguem a quem precisa, promovendo inclusão social e
          sustentabilidade.
        </p>
      </div>

      {/* Vídeo */}
      <div className="col-md-7" style={{ marginTop: "0" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            paddingBottom: "56.25%",
            borderRadius: "0.75rem",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://youtu.be/k1_8fikv5qI"
            title="Grain & Grace - Vídeo institucional"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
