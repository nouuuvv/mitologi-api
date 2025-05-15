const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, judul, deskripsi, gambar } = req.body;

  const { data, error } = await supabase
    .from("mitologi")
    .update({ judul, deskripsi, gambar })
    .eq("id", id);

  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
};
