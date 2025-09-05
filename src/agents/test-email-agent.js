import emailAgent from "./email-agent.js";

/**
 * Arquivo de exemplo para testar o agente de email
 * Execute com: node src/agents/test-email-agent.js
 */

async function testEmailAgent() {
  console.log("🚀 Testando Email Agent...\n");

  // Validar configurações
  if (!emailAgent.validateConfig()) {
    console.log("\n❌ Configuração incompleta. Verifique o arquivo .env");
    console.log("📋 Variáveis necessárias:");
    console.log("   - GROQ_API_KEY: Sua chave da API Groq");
    console.log("   - SMTP_USER: Seu email Gmail");
    console.log("   - SMTP_KEY: Senha de app do Gmail");
    return;
  }

  try {
    // Teste 1: Email de boas-vindas para Maria
    console.log("📧 Teste 1: Email de boas-vindas");
    const result1 = await emailAgent.sendWelcomeEmail(
      "tidy1502@gmail.com",
      "Maria Silva"
    );

    if (result1.success) {
      console.log("✅ Email de boas-vindas enviado com sucesso!");
      console.log(`📨 ID da mensagem: ${result1.messageId}\n`);
    } else {
      console.log("❌ Erro no envio:", result1.error);
    }

    // Teste 2: Email de boas-vindas para João (nome padrão)
    console.log("📧 Teste 2: Email de boas-vindas (nome padrão)");
    const result2 = await emailAgent.sendWelcomeEmail("tidy1502@gmail.com");

    if (result2.success) {
      console.log("✅ Email de boas-vindas enviado com sucesso!");
      console.log(`📨 ID da mensagem: ${result2.messageId}\n`);
    } else {
      console.log("❌ Erro no envio:", result2.error);
    }

    // Teste 3: Email de boas-vindas personalizado com contexto
    console.log("📧 Teste 3: Email de boas-vindas personalizado");
    const result3 = await emailAgent.sendWelcomeEmail(
      "tidy1502@gmail.com",
      "Carlos Silva",
      {
        empresa: "TechCorp Solutions",
        cargo: "Desenvolvedor Full Stack",
        interesses: ["React", "Node.js", "IA"],
        fonte: "indicação de amigo",
      }
    );

    if (result3.success) {
      console.log("✅ Email personalizado enviado com sucesso!");
      console.log(`📨 ID da mensagem: ${result3.messageId}\n`);
    } else {
      console.log("❌ Erro no envio:", result3.error);
    }
  } catch (error) {
    console.error("❌ Erro durante o teste:", error.message);
  }
}

// Executar teste
testEmailAgent().catch(console.error);
