# Grain & Grace

Uma plataforma inovadora que conecta produtores rurais e comunidades carentes por meio da doação de alimentos que seriam descartados, reduzindo o desperdício alimentar e promovendo inclusão social.

## 🚀 Funcionalidades

- **Mapeamento inteligente** de pontos de coleta e distribuição
- **Sistema de notificações** para alertar sobre doações disponíveis
- **Emails personalizados** de boas-vindas usando IA
- **Interface responsiva** para diferentes dispositivos
- **Sistema de compartilhamento** para expandir o alcance

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta Google (para envio de emails via Gmail)
- Chave da API Groq

## 🛠️ Instalação

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd grain-grace
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` e preencha os valores necessários (veja a seção "Configuração" abaixo).

## ⚙️ Configuração

O arquivo `.env` deve conter as seguintes variáveis obrigatórias:

### Variáveis Obrigatórias

- `GROQ_API_KEY` - Chave da API Groq para geração de conteúdo
- `SMTP_USER` - Email Gmail para envio de notificações
- `SMTP_KEY` - Senha de aplicativo do Gmail

### Variáveis Opcionais

- `PORT` - Porta do servidor (padrão: 3001)

### Como obter as chaves:

1. **Groq API Key:**

   - Acesse [https://console.groq.com/](https://console.groq.com/)
   - Crie uma conta e gere uma chave API
   - Copie a chave para `GROQ_API_KEY`

2. **Configuração Gmail:**
   - Ative a verificação em duas etapas na sua conta Google
   - Gere uma senha de aplicativo: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Use seu email Gmail em `SMTP_USER`
   - Use a senha de aplicativo em `SMTP_KEY`

## 🚀 Executando a Aplicação

### Desenvolvimento

Para executar tanto o frontend quanto o backend simultaneamente:

```bash
npm run dev:full
```

Este comando executará:

- Backend na porta 3001
- Frontend na porta 5173 (Vite)

### Apenas Frontend

```bash
npm run dev
```

### Apenas Backend

```bash
npm run server
```

### Build para Produção

```bash
npm run build
npm run preview
```

## 📧 API Endpoints

### POST /api/send-welcome

Envia um email de boas-vindas personalizado.

**Parâmetros:**

- `email` (obrigatório) - Email do destinatário
- `name` (opcional) - Nome do destinatário
- `context` (opcional) - Contexto adicional para personalização

**Exemplo:**

```bash
curl -X POST http://localhost:3001/api/send-welcome \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "name": "João Silva",
    "context": {
      "userType": "PRODUTOR"
    }
  }'
```

## 🧪 Testes

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
grain-grace/
├── src/
│   ├── agents/
│   │   └── email-agent.js      # Agente de email com IA
│   ├── components/
│   │   └── ShareButton.jsx     # Componente de compartilhamento
│   ├── sections/
│   │   ├── hero/               # Seção principal
│   │   ├── AboutUs.jsx
│   │   ├── Contact.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   └── Services.jsx
│   └── App.jsx
├── server.js                   # Servidor Express
├── api/
│   └── send-welcome.js         # Endpoint de email (não usado)
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

Desenvolvido com ❤️ pela equipe Grain & Grace

---

**Nota:** Certifique-se de que todas as variáveis de ambiente estão corretamente configuradas antes de executar a aplicação. O arquivo `.env.example` contém todas as variáveis necessárias como referência.
