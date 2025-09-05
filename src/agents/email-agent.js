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
      // Configurações adicionais para Gmail
      secure: true,
      tls: {
        rejectUnauthorized: false,
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
      const systemPrompt = `Você é um assistente especializado em criar emails de boas-vindas calorosos e personalizados para a plataforma Grain & Grace.

IMPORTANTE:
- NÃO inclua "Assunto:" ou qualquer referência a assunto no conteúdo
- Adapte o conteúdo baseado no tipo de usuário:
  - Para PRODUTOR: Foque em como cadastrar doações e usar o mapeamento de coleta
  - Para ONG: Destaque distribuição justa, notificações inteligentes e impacto social
  - Para BENEFICIÁRIO: Enfatize como encontrar alimentos próximos e usar o mapa interativo

Sempre crie mensagens que:
1. Comece DIRETAMENTE com uma saudação calorosa personalizada (ex: "Prezado João,")
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
      }. Use a estrutura sugerida e torne o conteúdo envolvente e motivacional, como se estivesse dando as boas-vindas a um novo membro valioso da comunidade Grain & Grace. Comece diretamente com "Prezado ${name}," ou similar.`;

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
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 1024,
      });

      let content =
        chatCompletion.choices[0]?.message?.content ||
        this.getDefaultWelcomeContent(name);

      // Remover qualquer referência a "Assunto:" do conteúdo
      content = content.replace(/^Assunto:.*$/gm, "").trim();
      content = content.replace(/^assunto:.*$/gm, "").trim();

      return content;
    } catch (error) {
      console.error("Erro ao gerar conteúdo de boas-vindas:", error.message);
      console.log("⚠️ Usando conteúdo padrão devido ao erro na API");
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

Estamos muito felizes em tê-lo(a) conosco no Grain & Grace!

Sua jornada para reduzir o desperdício alimentar e promover inclusão social começa agora. Estamos aqui para apoiá-lo(a) em cada passo, conectando produtores rurais e comunidades carentes por meio da doação de alimentos que seriam descartados.

Atenciosamente,
Equipe Grain & Grace`;
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
      console.log("🤖 Iniciando envio de email...");
      console.log("📧 Destinatário:", to);
      console.log("👤 Nome:", name);

      // Validar configurações antes de prosseguir
      if (!this.validateConfig()) {
        throw new Error("Configurações inválidas");
      }

      console.log("🤖 Gerando conteúdo personalizado de boas-vindas...");
      const welcomeContent = await this.generateWelcomeContent(name, context);
      console.log(
        "✅ Conteúdo gerado:",
        welcomeContent.substring(0, 100) + "..."
      );

      const subject = "Bem-vindo ao Grain & Grace - Do campo para a mesa!";
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

      console.log("📤 Enviando email...");
      console.log("📧 De:", process.env.SMTP_USER);
      console.log("📧 Para:", to);
      console.log("📧 Assunto:", subject);

      // Verificar conexão com o Gmail
      try {
        await this.transporter.verify();
        console.log("✅ Conexão com Gmail verificada");
      } catch (verifyError) {
        console.error("❌ Erro na verificação do Gmail:", verifyError);
        throw new Error(
          `Falha na verificação do Gmail: ${verifyError.message}`
        );
      }

      const result = await this.transporter.sendMail(mailOptions);
      console.log(
        "✅ Email de boas-vindas enviado com sucesso:",
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
