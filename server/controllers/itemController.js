import express from "express";
import { Item } from "../models/Item.js";

const itemController = express.Router();

  // update item
  itemController.put('/:id', async (req, res) => {
      try {
        const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json(updateItem);
      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

// delete an item
itemController.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        return res.status(200).json("Item successfully deleted")
    } catch (error) {
        return res.status(500).json(error.message)

    }
});

// get all items
itemController.get('/', async (req, res) => {
    try {
        const employees = await Item.find();
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json(error.message)
    }
});

// get single item
itemController.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(error.message)
    }
});

// create a new item
itemController.post('/', async (req, res) => {
    const newItem = new Item ({
        title: req.body.title,
        cost: req.body.cost,
        quantity: req.body.quantity,
        inStock: req.body.inStock
    })
    if (req.body.title || !req.body.cost || !req.body.inStock) {
        return res.status(200).json("Missing value")
    }

    try {
        const savedItem = await newItem.save()
        return res.status(200).json(savedItem);

    } catch (error) {
        return res.status(500).json(error.message)

    }
})



export default itemController;