import { Groq } from "groq-sdk";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

class EmailAgent {
  constructor() {
    // Configurar Groq
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Configurar transporter do Gmail
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_KEY,
      },
    });
  }

  /**
   * Gera conteúdo personalizado de boas-vindas usando IA
   * @param {string} name - Nome do destinatário
   * @param {Object} context - Contexto adicional
   * @returns {string} Conteúdo gerado
   */
  async generateWelcomeContent(name = "Cliente", context = {}) {
    try {
      const systemPrompt = `Você é um assistente especializado em criar emails de boas-vindas calorosos e personalizados.
      Sempre crie mensagens que:
      - Sejam calorosas e acolhedoras
      - Personalizem com o nome da pessoa
      - Destaquem os benefícios de fazer parte da comunidade
      - Incluam um call-to-action sutil
      - Mantenham um tom profissional mas amigável

      Contexto adicional: ${JSON.stringify(context)}`;

      const userPrompt = `Crie um email de boas-vindas personalizado para ${name}.`;

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        model: "openai/gpt-oss-20b",
        temperature: 0.7,
        max_tokens: 1024,
      });

      return (
        chatCompletion.choices[0]?.message?.content ||
        this.getDefaultWelcomeContent(name)
      );
    } catch (error) {
      console.error("Erro ao gerar conteúdo de boas-vindas:", error);
      return this.getDefaultWelcomeContent(name);
    }
  }

  /**
   * Retorna conteúdo padrão de boas-vindas
   * @param {string} name - Nome do destinatário
   * @returns {string} Conteúdo padrão
   */
  getDefaultWelcomeContent(name) {
    return `Bem-vindo(a), ${name}!

Estamos muito felizes em tê-lo(a) conosco no Grain Grace!

Sua jornada começa agora e estamos aqui para apoiá-lo(a) em cada passo.

Atenciosamente,
Equipe Grain Grace`;
  }

  /**
   * Envia email de boas-vindas
   * @param {string} to - Destinatário
   * @param {string} name - Nome do destinatário
   * @param {Object} context - Contexto adicional para personalização
   * @returns {Object} Resultado do envio
   */
  async sendWelcomeEmail(to, name = "Cliente", context = {}) {
    try {
      console.log("🤖 Gerando conteúdo personalizado de boas-vindas...");
      const welcomeContent = await this.generateWelcomeContent(name, context);

      const subject = "Bem-vindo ao Grain Grace!";
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Bem-vindo, ${name}!</h2>
          <div style="line-height: 1.6; color: #555;">
            ${welcomeContent.replace(/\n/g, "<br>")}
          </div>
        </div>
      `;

      const text = welcomeContent;

      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
        text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(
        "Email de boas-vindas enviado com sucesso:",
        result.messageId
      );

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      console.error("Erro ao enviar email de boas-vindas:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Valida configurações necessárias
   * @returns {boolean} True se tudo estiver configurado
   */
  validateConfig() {
    const required = ["GROQ_API_KEY", "SMTP_USER", "SMTP_KEY"];

    for (const env of required) {
      if (!process.env[env]) {
        console.error(`❌ Variável de ambiente ${env} não configurada`);
        return false;
      }
    }

    console.log("✅ Todas as configurações validadas");
    return true;
  }
}

// Exportar instância singleton
const emailAgent = new EmailAgent();

export default emailAgent;

// Exemplo de uso (descomente para testar)
export async function exampleUsage() {
  if (!emailAgent.validateConfig()) {
    console.log("Configure as variáveis de ambiente primeiro!");
    return;
  }

  const result = await emailAgent.sendWelcomeEmail(
    "destinatario@exemplo.com",
    "João Silva"
  );

  console.log("Resultado:", result);
}
