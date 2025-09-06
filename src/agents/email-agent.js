import { Groq } from "groq-sdk";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailAgent {
  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_KEY,
      },
    });
  }

  async generateWelcomeContent(name = "Cliente", context = {}) {
    try {
      const systemPrompt = `Você é um assistente especializado em criar emails de boas-vindas calorosos e personalizados para a plataforma Grain & Grace.

IMPORTANTE:
- NÃO inclua "Assunto:" ou qualquer referência a assunto no conteúdo
- Use EXATAMENTE o nome do destinatário informado: "${name}". NUNCA use nomes de exemplo.
- Adapte o conteúdo baseado no tipo de usuário:
  - Para PRODUTOR: Foque em como cadastrar doações e usar o mapeamento de coleta
  - Para ONG: Destaque distribuição justa, notificações inteligentes e impacto social
  - Para BENEFICIÁRIO: Enfatize como encontrar alimentos próximos e usar o mapa interativo

Sempre crie mensagens que:
1. Comece DIRETAMENTE com uma saudação calorosa personalizada usando exatamente o nome informado (ex: "Prezado(a) ${name},")
2. Apresente a missão da plataforma
3. Mencione os serviços relevantes para o perfil do usuário
4. Destaque os diferenciais da plataforma
5. Inclua sugestões práticas de ações que o usuário pode tomar
6. Termine com um tom motivacional e de apoio
7. Mantenha um tom profissional mas amigável e acolhedor

Estrutura sugerida:
- Saudação personalizada
- Apresentação da plataforma e missão
- Destaque dos serviços relevantes
- Benefícios e diferenciais
- Sugestões práticas de uso
- Mensagem motivacional
- Assinatura da equipe

Contexto adicional: ${JSON.stringify(context)}`;

      const userPrompt = `Crie APENAS o corpo do email de boas-vindas (sem assunto, sem "Assunto:") para ${name}, adaptado para o perfil de ${
        context.userType || "usuário"
      }. Use a estrutura sugerida e torne o conteúdo envolvente e motivacional, como se estivesse dando as boas-vindas a um novo membro valioso da comunidade Grain & Grace. Comece diretamente com uma saudação contendo EXATAMENTE o nome "${name}" (ex.: "Prezado(a) ${name},").`;

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 1024,
      });

      let content =
        chatCompletion.choices[0]?.message?.content ||
        this.getDefaultWelcomeContent(name);
      content = content.replace(/^Assunto:.*$/gm, "").trim();
      content = content.replace(/^assunto:.*$/gm, "").trim();

      // Garantir que a primeira saudação contenha exatamente o nome informado
      content = this.ensureGreetingWithName(content, name);

      return content;
    } catch (error) {
      return this.getDefaultWelcomeContent(name);
    }
  }

  ensureGreetingWithName(content, name) {
    if (!content || !name) return content;
    const sanitizedName = String(name).trim();
    const lines = content.split(/\r?\n/);
    let firstIdx = 0;
    while (firstIdx < lines.length && lines[firstIdx].trim() === "")
      firstIdx += 1;
    if (firstIdx >= lines.length) {
      return `Prezado(a) ${sanitizedName},\n\n`;
    }
    const first = lines[firstIdx];
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const hasCorrectName = new RegExp(
      `\\b${escape(sanitizedName)}\\b`,
      "i"
    ).test(first);
    const hasExample = /\bJo[ãa]o\b/i.test(first);
    if (!hasCorrectName || hasExample) {
      lines[firstIdx] = `Prezado(a) ${sanitizedName},`;
    }
    return lines.join("\n");
  }

  getDefaultWelcomeContent(name) {
    return `Bem-vindo(a), ${name}!

Estamos muito felizes em tê-lo(a) conosco no Grain & Grace!

Sua jornada para reduzir o desperdício alimentar e promover inclusão social começa agora. Estamos aqui para apoiá-lo(a) em cada passo, conectando produtores rurais e comunidades carentes por meio da doação de alimentos que seriam descartados.

Atenciosamente,
Equipe Grain & Grace`;
  }

  async sendWelcomeEmail(to, name = "Cliente", context = {}) {
    try {
      if (!this.validateConfig()) {
        throw new Error("Configurações inválidas");
      }

      const welcomeContent = await this.generateWelcomeContent(name, context);
      const subject = "Bem-vindo ao Grain & Grace - Do campo para a mesa!";
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Bem-vindo, ${name}!</h2>
          <div style="line-height: 1.6; color: #555;">
            ${welcomeContent.replace(/\n/g, "<br>")}
          </div>
        </div>
      `;

      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
        text: welcomeContent,
      };

      await this.transporter.verify();
      const result = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  validateConfig() {
    const required = ["GROQ_API_KEY", "SMTP_USER", "SMTP_KEY"];

    for (const env of required) {
      if (!process.env[env]) {
        return false;
      }
    }

    return true;
  }
}

// Exportar instância singleton
const emailAgent = new EmailAgent();

export default emailAgent;
