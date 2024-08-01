var express = require("express");
const productsModel = require("../models/products");
const ordersModel = require("../models/order");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("Welcome to the index page");
});

router.post("/product", async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    await productsModel.create({ name, description, price });

    res.send("Product created successfully");
  } catch (error) {
    next(error);
  }
});

router.get("/products/:limit/:page", async (req, res, next) => {
  // router.get("/products/:limit/:skip", async (req, res, next) => {
  try {
    const { limit, page } = req.params;
    // const { limit, skip } = req.params;

    // const products = await productsModel.find({}).limit(limit).skip(skip);
    // const productCount = await productsModel.countDocuments({});
    // const totalPage = Math.ceil(productCount / limit);
    // res.send({
    //   products,
    //   totalProducts: productCount,
    //   totalPage,
    //   skip,
    //   limit,
    //   hasPrevious: skip > 0,
    //   hasNext: skip <= totalPage,
    // });

    const products = await productsModel.paginate({}, { page, limit });

    res.send({ products });
  } catch (error) {
    next(error);
  }
});

router.post("/order", async (req, res, next) => {
  try {
    // product, itemCount, totalPrice
    const { products } = req.body;

    await ordersModel.create(products);

    res.send({ message: "order created" });
  } catch (error) {
    next(error);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    // product, itemCount, totalPrice
    const orders = await ordersModel
      // .find({})
      // .populate("product", "-createdAt -updatedAt");
      .find({}, "product itemCount")
      .populate("product", "name, price");

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
