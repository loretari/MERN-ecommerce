import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    cost: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    inStock: {
        type: Boolean,
        default: true,
    }
},
    {timestamps: true}
    );

export const Item = mongoose.model("Item", ItemSchema);