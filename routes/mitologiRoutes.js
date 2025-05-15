const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ GET semua mitologi
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("mitologi")
    .select("*")
    .order("id", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ INSERT data
router.post("/", async (req, res) => {
  const { judul, deskripsi, gambar } = req.body;
  const { data, error } = await supabase
    .from("mitologi")
    .insert([{ judul, deskripsi, gambar }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// ✅ UPDATE data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, gambar } = req.body;
  const { data, error } = await supabase
    .from("mitologi")
    .update({ judul, deskripsi, gambar })
    .eq("id", id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// ✅ DELETE data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("mitologi").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Data berhasil dihapus" });
});

module.exports = router;
