const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.getAll = async (req, res) => {
  const { data, error } = await supabase.from("mitologi").select("*");
  if (error) return res.status(500).json(error);
  res.json(data);
};

exports.insertData = async (req, res) => {
  const { judul, deskripsi, gambar } = req.body;
  const { data, error } = await supabase
    .from("mitologi")
    .insert([{ judul, deskripsi, gambar }]);
  if (error) return res.status(500).json(error);
  res.json(data);
};

exports.updateData = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, gambar } = req.body;
  const { data, error } = await supabase
    .from("mitologi")
    .update({ judul, deskripsi, gambar })
    .eq("id", id);
  if (error) return res.status(500).json(error);
  res.json(data);
};

exports.deleteData = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("mitologi").delete().eq("id", id);
  if (error) return res.status(500).json(error);
  res.json(data);
};
