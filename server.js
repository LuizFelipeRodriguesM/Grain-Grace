import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import emailAgent from "./src/agents/email-agent.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-welcome", async (req, res) => {
  try {
    const { email, name, context } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, error: "Missing 'email'" });
    }

    const result = await emailAgent.sendWelcomeEmail(
      email,
      name || "Cliente",
      context || {}
    );

    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error.message || "Internal Error" });
  }
});

app.listen(PORT, () => {
  console.log(`API dev server running on http://localhost:${PORT}`);
});
