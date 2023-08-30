const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  price: { type: Number },
  creator: { type: mongoose.Types.ObjectId },
});

module.exports = {
  ProductModel: mongoose.model("product", ProductSchema),
};
