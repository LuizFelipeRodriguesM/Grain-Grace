import React, { useState } from "react";

const reactions = [
  { emoji: "❤️", label: "Amo!", color: "#FF6B6B" },
  { emoji: "👍", label: "Aprovo!", color: "#4ECDC4" },
  { emoji: "🤝", label: "Vamos juntos!", color: "#45B7D1" },
  { emoji: "🌱", label: "Sustentável!", color: "#96CEB4" },
  { emoji: "⭐", label: "Inspirador!", color: "#FFEAA7" },
];

const messages = [
  "Sua reação foi registrada! Obrigado por se importar! 💚",
  "Cada pequena ação conta! Vamos fazer a diferença juntos! 🌍",
  "Sua participação faz toda a diferença! Obrigado! 🙏",
  "Juntos somos mais fortes! Vamos combater o desperdício! 💪",
  "Sua voz importa! Obrigado por compartilhar sua opinião! 🎉",
];

export default function Features() {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleReaction = (index) => {
    setSelectedReaction(index);
    setMessageIndex(Math.floor(Math.random() * messages.length));
    setShowMessage(true);
    setClickCount((prev) => prev + 1);

    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedReaction(null);
    setShowMessage(false);
    setClickCount(0);
  };

  return (
    <>
      <style>
        {`
          .hover-soft { transition: transform 180ms ease; }
          .hover-soft:hover { transform: translateY(-2px) scale(1.01); }

          @media (hover: none) { .hover-soft:hover { transform: none; } }
          @media (max-width: 992px) { .hover-soft:hover { transform: none; } }

          .mobile-header-text { font-size: clamp(1.4rem, 3.4vw, 3rem) !important; line-height: 1.2; }
          .mobile-sub-text { font-size: clamp(1rem, 1.8vw, 1.25rem) !important; line-height: 1.6; }
          .reaction-btn {
            transition: all 0.3s ease;
            border: 3px solid transparent;
            background: white;
            border-radius: 20px;
            cursor: pointer;
            min-width: 140px;
            min-height: 140px;
          }
          .reaction-btn:hover {
            transform: scale(1.05);
          }
          .reaction-btn.active {
            border-color: currentColor;
            background: rgba(77, 161, 76, 0.1);
          }
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .bounce-in {
            animation: bounceIn 0.6s ease-out;
          }
          @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div
        id="features"
        className="container-fluid"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          className="row mx-2 mx-md-4 pb-2"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="col-12 py-2 py-md-3">
            <div
              className="card border-0"
              style={{
                borderRadius: 24,
                background: "#FFFFFF",
              }}
            >
              <div className="card-body p-4 p-md-5 text-center">
                {/* Header */}
                <div className="mb-4">
                  <div className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-3 bg-white rounded-pill">
                    <span className="text-success" style={{ fontSize: 20 }}>
                      💫
                    </span>
                    <span className="text-muted fw-medium">Sua Reação</span>
                  </div>
                  <h2 className="display-6 display-4 display-md-6 w-100 mobile-header-text mb-3">
                    O que você acha da nossa missão?
                  </h2>
                  <p className="text-muted mobile-sub-text mb-4">
                    Clique em uma reação abaixo e veja o que acontece! Cada
                    interação sua importa para nós.
                  </p>
                </div>

                {/* Reaction Buttons */}
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                  {reactions.map((reaction, index) => (
                    <button
                      key={index}
                      className={`reaction-btn d-flex flex-column align-items-center justify-content-center p-3 ${
                        selectedReaction === index
                          ? "active pulse-animation"
                          : ""
                      }`}
                      style={{
                        color:
                          selectedReaction === index
                            ? reaction.color
                            : "#6c757d",
                      }}
                      onClick={() => handleReaction(index)}
                    >
                      <div style={{ fontSize: 40, marginBottom: 8 }}>
                        {reaction.emoji}
                      </div>
                      <div className="fw-semibold" style={{ fontSize: 14 }}>
                        {reaction.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Counter */}
                {clickCount > 0 && (
                  <div className="mb-3">
                    <div
                      className="badge bg-success px-3 py-2"
                      style={{ fontSize: 14 }}
                    >
                      🎯 Você interagiu {clickCount} vez
                      {clickCount > 1 ? "es" : ""}!
                    </div>
                  </div>
                )}

                {/* Message */}
                {showMessage && (
                  <div className="bounce-in">
                    <div
                      className="alert alert-success d-inline-block"
                      style={{
                        borderRadius: 20,
                        border: "none",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: 20 }}>✨</span>
                        <span>{messages[messageIndex]}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                {clickCount > 0 && (
                  <div className="mt-4">
                    <button
                      className="btn btn-outline-secondary btn-sm px-4 py-2"
                      style={{ borderRadius: 20 }}
                      onClick={handleReset}
                    >
                      🔄 Começar novamente
                    </button>
                  </div>
                )}

                {/* Fun Stats */}
                <div className="mt-4 pt-3 border-top">
                  <div className="row g-3">
                    <div className="col-4">
                      <div className="text-center">
                        <div style={{ fontSize: 24 }}>🌍</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Sustentável
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-center">
                        <div style={{ fontSize: 24 }}>🤝</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Inclusivo
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-center">
                        <div style={{ fontSize: 24 }}>💚</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Solidário
                        </div>
                      </div>
                    </div>
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
