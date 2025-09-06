import React, { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Coletar dados do formulário
      const formData = new FormData(e.target);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        userType: formData.get("userType"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        phonePrefix:
          e.target.querySelector('select[name="phonePrefix"]')?.value || "+55",
      };

      // Contexto personalizado para o email
      const context = {
        platform: "Grain & Grace",
        mission:
          "Do campo para a mesa: reduzindo o desperdício, alimentando quem precisa",
        userType: data.userType,
        services: [
          "Cadastro de Doações",
          "Mapeamento de Coleta",
          "Distribuição Justa",
          "Notificações Inteligentes",
          "Mapa Interativo",
        ],
        differentials: [
          "Inclusão Social",
          "Sustentabilidade",
          "Tecnologia Simples",
          "Impacto Mensurável",
        ],
      };

      // Enviar via API serverless
      console.log("📧 Enviando email via API /api/send-welcome...");
      const apiUrl =
        typeof window !== "undefined" &&
        window.location.hostname === "localhost"
          ? "http://localhost:3001/api/send-welcome"
          : "/api/send-welcome";
      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, name: data.name, context }),
      });
      let result = { success: false };
      try {
        result = await resp.json();
      } catch (_) {
        // resposta sem JSON
        result = { success: resp.ok };
      }

      if (result.success) {
        setSubmitStatus("success");
        e.target.reset();
        console.log("✅ Email enviado com sucesso:", result.messageId);
      } else {
        throw new Error(
          result.error || `Erro ao enviar email (${resp.status})`
        );
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          html, body { margin: 0; padding: 0; }

          .hover-soft { transition: transform 180ms ease, box-shadow 180ms ease; }
          .hover-soft:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

          @media (hover: none) { .hover-soft:hover { transform: none; } }
          @media (max-width: 992px) { .hover-soft:hover { transform: none; } }

          .mobile-header-text { font-size: clamp(1.6rem, 3.6vw, 3rem) !important; line-height: 1.2; }
          .mobile-sub-text { font-size: clamp(1rem, 1.8vw, 1.25rem) !important; line-height: 1.6; }
          .input-lg { height: 52px; }
          .rounded-2xl { border-radius: 24px; }
          .pill { border-radius: 999px; }
          .focus-ring:focus { box-shadow: 0 0 0 0.25rem rgba(77,161,76,0.25); outline: none; }
          .surface { border: 1px solid #eef0f2; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
          .input-clean { border: 1px solid #e5e7eb !important; background: #ffffff !important; box-shadow: none !important; }
          .input-clean:focus { border-color: #4DA14C !important; }
        `}
      </style>

      <div
        id="contact"
        className="container-fluid d-flex align-items-center"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Content */}
        <div
          className="row mx-2 mx-md-4 pb-2"
          style={{ backgroundColor: "transparent", width: "100%" }}
        >
          <div className="col-12 py-2 py-md-3">
            <div className="card surface border-0" style={{ borderRadius: 24 }}>
              <div className="card-body p-3 p-md-4 p-lg-5">
                <div className="row gx-4 gx-md-5 gy-4 gy-md-4 align-items-center">
                  {/* Left - Header and image */}
                  <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
                    {/* Header */}
                    <div className="mb-2" style={{ marginTop: "-20px" }}>
                      <div className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-1 bg-white shadow-sm rounded-pill">
                        <span className="text-success" style={{ fontSize: 18 }}>
                          ✉️
                        </span>
                        <span className="text-muted fw-medium">
                          Contato / Cadastro
                        </span>
                      </div>
                      <h2 className="display-6 display-4 display-md-6 w-100 mobile-header-text mb-1">
                        Junte-se ao Grain & Grace
                      </h2>
                      <p
                        className="text-muted mobile-sub-text"
                        style={{ marginBottom: "2rem" }}
                      >
                        Conecte-se com nossa missão de reduzir o desperdício
                        alimentar e promover inclusão social. Cadastre-se e faça
                        parte dessa mudança!
                      </p>
                    </div>

                    {/* Agriculture Image */}
                    <div className="mt-4">
                      <div
                        className="card border-0 shadow-sm"
                        style={{ borderRadius: 24 }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1600&auto=format&fit=crop"
                          alt="Agricultura sustentável - Campo de cultivo"
                          className="w-100"
                          style={{
                            display: "block",
                            objectFit: "cover",
                            height: "400px",
                            borderRadius: 24,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right - clean form */}
                  <div className="col-lg-6 col-12">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label text-muted">Nome</label>
                          <input
                            className="form-control input-lg rounded-2xl focus-ring input-clean"
                            type="text"
                            name="name"
                            placeholder="Seu nome completo"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label text-muted">
                            Tipo de Usuário
                          </label>
                          <select
                            className="form-select input-lg rounded-2xl focus-ring input-clean"
                            name="userType"
                            required
                          >
                            <option value="">Selecione seu perfil</option>
                            <option value="produtor">Produtor</option>
                            <option value="ong">ONG</option>
                            <option value="beneficiario">Beneficiário</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label text-muted">Email</label>
                          <input
                            className="form-control input-lg rounded-2xl focus-ring input-clean"
                            type="email"
                            name="email"
                            placeholder="voce@email.com"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label text-muted">
                            Telefone
                          </label>
                          <div className="input-group">
                            <select
                              className="form-select input-lg rounded-2xl focus-ring input-clean"
                              style={{ maxWidth: 120 }}
                              defaultValue={"+55"}
                              name="phonePrefix"
                            >
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+34">+34</option>
                              <option value="+55">+55</option>
                              <option value="+351">+351</option>
                            </select>
                            <input
                              className="form-control input-lg rounded-2xl focus-ring input-clean"
                              type="tel"
                              name="phone"
                              placeholder="Seu telefone"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="form-label text-muted">
                            Mensagem
                          </label>
                          <textarea
                            className="form-control rounded-2xl focus-ring input-clean"
                            name="message"
                            rows={5}
                            placeholder="Digite sua mensagem"
                            required
                          />
                        </div>
                        <div className="col-12 pt-2">
                          <button
                            type="submit"
                            className="btn btn-success px-6 py-4"
                            style={{
                              backgroundColor: "#4DA14C",
                              borderColor: "#4DA14C",
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "Cadastrando..."
                              : "Cadastrar-se no Grain & Grace"}
                          </button>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === "success" && (
                          <div className="col-12 mt-3">
                            <div className="alert alert-success" role="alert">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              Cadastro realizado com sucesso! Verifique seu
                              email para as boas-vindas.
                            </div>
                          </div>
                        )}

                        {submitStatus === "error" && (
                          <div className="col-12 mt-3">
                            <div className="alert alert-danger" role="alert">
                              <i className="bi bi-exclamation-triangle-fill me-2"></i>
                              Erro ao enviar cadastro. Tente novamente ou entre
                              em contato conosco.
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
