import { kv } from "@vercel/kv";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // base64 resimler için büyük limit
    },
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Geçersiz veri" });
    }
    await kv.set("kalip_data", data);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("KV save error:", err);
    return res.status(500).json({ error: "Kayıt başarısız" });
  }
}
