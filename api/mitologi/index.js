// /api/mitologi/index.js
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// —— CORS ——
const setCORS = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

module.exports = async (req, res) => {
  setCORS(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "POST") {
      const { judul, deskripsi, gambar } = req.body;
      const { data, error } = await supabase
        .from("mitologi")
        .insert([{ judul, deskripsi, gambar }]);
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === "GET") {
      const { data, error } = await supabase.from("mitologi").select("*");
      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API /mitologi error:", err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
};
