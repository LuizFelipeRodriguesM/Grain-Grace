import React, { useState, useEffect } from "react";

const fruits = [
  { name: "banana", emoji: "🍌", image: "banana.png" },
  { name: "maca", emoji: "🍎", image: "maca.png" },
  { name: "pera", emoji: "🍐", image: "pera.png" },
];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Inicializar o jogo
  const initializeGame = () => {
    const gameCards = [];
    fruits.forEach((fruit, index) => {
      // Criar dois cards de cada fruta (pares)
      gameCards.push({
        id: `${fruit.name}-1`,
        fruit: fruit.name,
        emoji: fruit.emoji,
        image: fruit.image,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `${fruit.name}-2`,
        fruit: fruit.name,
        emoji: fruit.emoji,
        image: fruit.image,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Embaralhar as cartas
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    setShowCelebration(false);
  };

  // Inicializar o jogo quando o componente montar
  useEffect(() => {
    initializeGame();
  }, []);

  // Verificar pares quando duas cartas estiverem viradas
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.fruit === secondCard.fruit) {
        // Par encontrado!
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs(prev => [...prev, firstCard.fruit]);
          setFlippedCards([]);
        }, 500);
      } else {
        // Não é par, virar as cartas de volta
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards]);

  // Verificar se o jogo está completo
  useEffect(() => {
    if (matchedPairs.length === fruits.length && cards.length > 0) {
      setGameComplete(true);
      setShowCelebration(true);

      // Esconder celebração após 3 segundos
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  }, [matchedPairs, cards.length, fruits.length]);

  const handleCardClick = (card) => {
    if (
      flippedCards.length < 2 &&
      !card.isFlipped &&
      !card.isMatched &&
      !flippedCards.some(flippedCard => flippedCard.id === card.id)
    ) {
      setCards(prevCards =>
        prevCards.map(c =>
          c.id === card.id ? { ...c, isFlipped: true } : c
        )
      );
      setFlippedCards(prev => [...prev, card]);
    }
  };

  return (
    <>
      <style>
        {`
          .memory-game-card {
            transition: all 0.3s ease;
            border-radius: 12px;
            cursor: pointer;
            min-height: 120px;
            background: linear-gradient(135deg, #4DA14C, #66BB6A);
            border: 3px solid transparent;
          }

          .memory-game-card:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 25px rgba(77, 161, 76, 0.3);
          }

          .memory-game-card.flipped {
            background: white;
            border-color: #4DA14C;
          }

          .memory-game-card.matched {
            background: linear-gradient(135deg, #81C784, #A5D6A7);
            cursor: default;
            animation: matchedPulse 1s ease-in-out;
          }

          @keyframes matchedPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .card-back {
            background: linear-gradient(135deg, #4DA14C, #66BB6A);
            color: white;
            font-size: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-radius: 8px;
          }

          .card-front {
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 10px;
            border-radius: 8px;
          }

          .fruit-emoji {
            font-size: 2.5rem;
            margin-bottom: 5px;
          }

          .celebration {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(129, 199, 132, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: celebrationFade 3s ease-in-out;
          }

          @keyframes celebrationFade {
            0% { opacity: 0; }
            20%, 80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>

      <div
        id="memory-game"
        className="container-fluid"
        style={{ position: "relative", zIndex: 2, paddingTop: "2rem", paddingBottom: "4rem" }}
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
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-3 bg-white rounded-pill">
                    <span className="text-success" style={{ fontSize: 20 }}>
                      🧠
                    </span>
                    <span className="text-muted fw-medium">Jogo da Memória</span>
                  </div>
                  <h2 className="display-6 display-md-6 w-100 mb-3" style={{ color: "#1a202c" }}>
                    Encontre os Pares de Frutas!
                  </h2>
                  <p className="text-muted mb-4">
                    Clique nas cartas para virá-las e encontre todos os pares de frutas.
                    <br />
                    <strong>Movimentos: {moves}</strong> |
                    <strong>Pares encontrados: {matchedPairs.length}/{fruits.length}</strong>
                  </p>
                </div>

                {/* Game Board */}
                <div className="row g-2 justify-content-center mb-4">
                  {cards.map((card, index) => (
                    <div key={card.id} className="col-4 col-md-2">
                      <div
                        className={`memory-game-card card h-100 ${
                          card.isFlipped ? "flipped" : ""
                        } ${card.isMatched ? "matched" : ""}`}
                        onClick={() => handleCardClick(card)}
                        style={{
                          boxShadow: card.isMatched
                            ? "0 4px 15px rgba(129, 199, 132, 0.4)"
                            : "0 4px 15px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="card-body p-2">
                          {card.isFlipped || card.isMatched ? (
                            <div className="card-front text-center">
                              <div className="fruit-emoji">{card.emoji}</div>
                              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                                {card.fruit}
                              </small>
                            </div>
                          ) : (
                            <div className="card-back">
                              ❓
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Game Stats and Controls */}
                <div className="text-center">
                  {gameComplete && (
                    <div className="mb-3">
                      <div
                        className="badge bg-success px-3 py-2 mb-3"
                        style={{ fontSize: 16 }}
                      >
                        🎉 Parabéns! Você completou o jogo em {moves} movimentos!
                      </div>
                    </div>
                  )}

                  <button
                    className="btn px-4 py-2"
                    style={{
                      background: "linear-gradient(135deg, #4DA14C, #66BB6A)",
                      border: "none",
                      borderRadius: 20,
                      color: "white",
                    }}
                    onClick={initializeGame}
                  >
                    🔄 Jogar Novamente
                  </button>
                </div>

                {/* Fun Stats */}
                <div className="mt-4 pt-3 border-top">
                  <div className="row g-3 text-center">
                    <div className="col-4">
                      <div>
                        <div style={{ fontSize: 24 }}>🍌</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Banana
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div>
                        <div style={{ fontSize: 24 }}>🍎</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Maçã
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div>
                        <div style={{ fontSize: 24 }}>🍐</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                          Pera
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

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="celebration">
          <div className="text-center" style={{ color: "white" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
            <h2 style={{ fontSize: "2rem" }}>Parabéns!</h2>
            <p>Você encontrou todos os pares!</p>
          </div>
        </div>
      )}
    </>
  );
}
