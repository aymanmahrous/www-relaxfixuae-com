import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Telegram notification endpoint
app.post("/api/notify-telegram", async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.TELEGRAM_BOT_TOKEN ||!process.env.TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: "Telegram not configured" });
    }

    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });

    if (!response.ok) throw new Error("Telegram API error");
    res.json({ ok: true });
  } catch (error) {
    console.error("Telegram error:", error);
    res.status(500).json({ error: "Failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
