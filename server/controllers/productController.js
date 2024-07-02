import Product from "../models/Product.js";

export const createProducts = async (req, res) => {
  try {
    const products = req.body;
    const productsList = [];
    for (let x of products) {
      const name = x.name.toLowerCase();
      let product = await Product.findOne({ name: name });
      if (!product) {
        let products = await Product.create({
          name: name,
          price: x.price,
          gst: x.gst,
        });
        productsList.push(products);
      }
    }
    res.status(201).json({
      status: true,
      message: "Products uploaded successfully",
      productsList: productsList,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().select("name price");
    res.status(200).json(products.length > 0 ? products : []);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
