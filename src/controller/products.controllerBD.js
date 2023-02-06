const ProductManager = require("../ProductManager");
const Product = new ProductManager('./assets/product.json');
const productModel = require ('../dao/models/product.model');

const getProduct = async (req, res) => {
  const {limit: limite = ""} = req.query;
  console.log(limite);
  try {
    if (!limite) {
      let product = await productModel.find();
      console.log(product)
      res.render ('home', {product})
      return res.json({
      msg: 'ok',
      playload: product ,})
    } else {
      let product = await productModel.find().limit(limite);
      console.log(product)
      return res.json({
      msg: 'ok',
      playload: product ,}) 
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'error',
      playload: 'Error al obtener productos',
    })
  }
};

const addProduct = async (req,res) => {
  const product = req.body
  try {
    let newproduct = await productModel.create(product)
    console.log(newproduct)
    return res.json ({
      msg: 'ok',
      playload: newproduct,
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'error',
      playload: 'Error al agregar producto',
    })
  };
}

const getProductByID = async (req, res) => {
  const id = req.params.pid;
  console.log(id);
  try {
    let productbyID = await productModel.findById(id);
    console.log(productbyID)
    return res.json({
      msg: 'ok',
      playload: productbyID,})
    //res.render('home', {product});    
  } catch (error) {
    return res.status(500).json({
      msg: 'error',
      playload: 'Error al obtener productos',
    })
  }
};

const deleteByID = async (req, res) => {
  const id = req.params.pid;
  console.log(id);
  try {
    let deletebyID = await productModel.findByIdAndDelete(id);
    console.log(deletebyID)
    return res.json({
      msg: 'ok',
      playload: deletebyID,})
    //res.render('home', {product});    
  } catch (error) {
    return res.status(500).json({
      msg: 'error',
      playload: 'Error al obtener productos',
    })
  }
};

const updateByID = async (req, res) => {
  const id = req.params.pid;
  const {title,description,code,price,stock,category,thumbnail} = req.body;
  console.log(id);
  try {
    let updateID = await productModel.findByIdAndUpdate(id,{title,description,code,price,stock,category,thumbnail});
    console.log(updateID)
    return res.json({
      msg: 'ok',
      playload: updateID,})
    //res.render('home', {product});    
  } catch (error) {
    return res.status(500).json({
      msg: 'error',
      playload: 'Error al obtener productos',
    })
  }
};

module.exports ={
    getProduct,
    addProduct,
    getProductByID,
    deleteByID,
    updateByID,
}