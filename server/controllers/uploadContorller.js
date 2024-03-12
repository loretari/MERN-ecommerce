import express from "express";

const uploadController = express.Router();
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
    // same as storage: storage

})

uploadController.post('/image', upload.single('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: "No file uploaded"})
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    });

});

export default uploadController;