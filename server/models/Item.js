import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    categories: {
            type: Array,
            required: true,
        },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    image: {
            type: String,
            required: true,
        },
},
    {timestamps: true}
    );

export const Item = mongoose.model("Item", ItemSchema);