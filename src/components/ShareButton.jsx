import React, { useCallback, useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Grain & Grace",
      text: "Do campo para a mesa: reduza o desperdício e alimente quem precisa",
      url:
        typeof window !== "undefined"
          ? window.location.href
          : "https://grain-grace.example",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (_) {
      // Se o usuário cancelar o share nativo, cai no fallback silenciosamente
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // Fallback final: abre modal nativo de prompt
      const ok = window.confirm(
        "Copiar link da página para compartilhar?\n\n" + shareData.url
      );
      if (ok) {
        // Melhor esforço: tenta selecionar/capturar para copiar
        const textarea = document.createElement("textarea");
        textarea.value = shareData.url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    }
  }, []);

  return (
    <>
      <style>{`
        .floating-share {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 999;
        }
        .share-btn {
          background-color: #4DA14C;
          color: #ffffff;
          border: none;
          border-radius: 999px;
          padding: 14px 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.18);
        }
        .share-pill {
          background: #0D3C2D;
          color: #ffffff;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
        }
        @media (max-width: 768px) {
          .share-btn { padding: 12px 14px; }
        }
      `}</style>

      <div className="floating-share">
        <button
          className="share-btn"
          onClick={handleShare}
          aria-label="Compartilhar"
        >
          <span>🔗</span>
          <span className="share-pill">Compartilhar</span>
        </button>
        {copied && (
          <div
            className="mt-2"
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "6px 10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              color: "#0D3C2D",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Link copiado!
          </div>
        )}
      </div>
    </>
  );
}
