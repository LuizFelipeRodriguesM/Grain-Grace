import emailAgent from "../src/agents/email-agent.js";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { email, name, context } = await parseJsonBody(req);
    if (!email) {
      return res.status(400).json({ success: false, error: "Missing 'email'" });
    }

    const result = await emailAgent.sendWelcomeEmail(
      email,
      name || "Cliente",
      context || {}
    );

    // Adiciona mensagem personalizada para exibição no modal
    if (result.success) {
      result.message = `Olá ${name || "Cliente"}! Enviamos um email de boas-vindas para ${email}. Verifique sua caixa de entrada e também a pasta de spam.`;
      result.email = email;
      result.name = name || "Cliente";
    }

    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error.message || "Internal Error" });
  }
}
