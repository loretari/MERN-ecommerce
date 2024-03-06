import express from "express";
import { Product } from "../models/Product.js";
import { verifyToken } from "../midlewares/verifyToken.js";

const productController = express.Router();

   //create a new product (admin)
   productController.post('/', async (req, res) => {
       const product = await Product(req.body);

       try {
        const newProduct = await product.save();
        return res.status(200).json(newProduct);

       } catch (error) {
           return res.status(500).json(error.message)
       }
   })

  // update existing product
  productController.put('/:id', async (req, res) => {
      try {
          const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
          return res.stat(200).json(updatedProduct);

      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

     // delete product
    productController.delete('/:id', async (req, res) => {
        try {
          await Product.findOneAndDelete(req.params.id)
            return res.status(200).json("Product successfully deleted")
        } catch (error) {
            return res.status(500).json(error.message)
        }
    })

  // get all products (everybody can see them)
  productController.get('/', async (req, res) => {
      try {
      const queryCat = req.query.category

          let products
          if (queryCat) {
              // check if the product's categories are inside the query we pass
              products = await Product.find({categories: queryCat });

          } else {
              products = await Product.find();
          }

          return res.status(200).json(products);

      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

  // get all (only register user can see them)
  productController.get('/all', verifyToken, async (req, res) => {
      try {
          // req.query = {categories: 'dress'}
          const products = await Product.find(req.query)
          return res.status(200).json(products);
      } catch (error) {
          return res.status(500).json(error.message)
      }
  })



  // get single product
  productController.get('/find/:id', async (req, res) => {
      try {
          const product = await Product(req.params.id);
          return res.status(200).json(product)

      } catch (error) {
          return res.status(500).json(error.message)
      }
})


 // get admin
   productController.get('/admin/find/:id', async (req, res) => {
       try {
           const product = await Product.findById(req.params.id);
           return res.status(200).json(product);
       } catch (error) {
           return res.status(500).json(error.message)
       }
   })

export default productController;