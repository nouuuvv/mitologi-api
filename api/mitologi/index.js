export const config = {
  api: {
    bodyParser: true,
  },
};

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  // Tambahkan header CORS ini
  res.setHeader("Access-Control-Allow-Origin", "*"); // untuk testing bisa pakai '*', nanti disesuaikan domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { judul, deskripsi, gambar } = req.body;

    const { data, error } = await supabase
      .from("mitologi")
      .insert([{ judul, deskripsi, gambar }]);

    if (error) return res.status(500).json({ error });
    return res.status(201).json(data);
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("mitologi").select("*");
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
};
