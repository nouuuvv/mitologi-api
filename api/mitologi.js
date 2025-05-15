const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("mitologi").select("*");
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { judul, deskripsi, gambar } = req.body;
    const { data, error } = await supabase
      .from("mitologi")
      .insert([{ judul, deskripsi, gambar }]);
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  res.status(405).json({ error: "Method not allowed" });
};
