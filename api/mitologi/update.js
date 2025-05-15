const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query; // <-- ambil dari query param
  const { judul, deskripsi, gambar } = req.body;

  if (!id) return res.status(400).json({ error: "ID diperlukan" });

  const { data, error } = await supabase
    .from("mitologi")
    .update({ judul, deskripsi, gambar })
    .eq("id", id);

  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
};
