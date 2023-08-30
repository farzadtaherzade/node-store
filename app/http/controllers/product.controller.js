const createHttpError = require("http-errors");
const { ProductModel } = require("../../models/product");
const Controller = require("./controller");
const path = require("path");
const { isSlug } = require("../../utils/functions");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const { title, description, price } = req.body;
      const slug = title.replace(" ", "-").toLowerCase();
      let cover = path.join(req.body.fileUploadPath, req.body.fileName);
      cover = cover.replace(/\\/g, "/");
      const productCreateResult = await ProductModel.create({
        title,
        slug,
        price,
        cover,
        description,
        creator: req.user._id,
      });
      if (!productCreateResult)
        throw createHttpError.InternalServerError("internal Error");
      return res.status(201).json({
        statusCode: 201,
        message: "product created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async editProduct(req, res, next) {}
  async removeProduct(req, res, next) {}
  async getAllProduct(req, res, next) {
    try {
      const products = await ProductModel.find({});
      return res.status(200).json({
        statusCode: 200,
        products,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { slug } = req.params;
      if (!isSlug(slug)) throw createHttpError.BadRequest("params is not slug");
      const product = await this.getProductBySlug(slug);
      return res.status(200).json({
        statusCode: 200,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductBySlug(slug) {
    const product = await ProductModel.findOne({ slug });
    if (!product) throw createHttpError.NotFound("product not found");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
