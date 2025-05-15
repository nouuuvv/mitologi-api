const express = require("express");
const router = express.Router();
const controller = require("../utils/supabase");

router.get("/", controller.getAll);
router.post("/", controller.insertData);
router.put("/:id", controller.updateData);
router.delete("/:id", controller.deleteData);

module.exports = router;
