import express from "express";


const uploadController = express.Router();
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

    // destination: (req, file, cb) => {
    //     cb(null, "./public/images")
    // },
    // filename: (req, file, cb) => {
    //     cb(null, req.body.filename)
    // }


    destination: './public/images',
    filename: (req, file, cb) => {
        const filename = `product_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);

    // destination: function (req, file, cb) {
    //    cb(null, './public/images');
    // },
    // filename: (req, file, cb) => {
    //     cb(null, req.body.filename)
    // }

    // filename: function (req, file, cb) {
    //     cb(null, `${Date.now()}-${file.originalname}`);
    // }

    // return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
    // same as storage: storage

})

uploadController.post('/image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: "No file uploaded"})
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })

 //    try {
 // return res.status(200).json({message: "Successfully uploaded file"})
 //    } catch (error) {
 //        console.log(error.message)
 //        return res.status(500).json({ error: "Failed to upload file" });
 //    }
    // if (!req.file) {
    //     return res.status(400).json({error: "No file uploaded"})
    // }
    //
    // res.json({
    //     success: 1,
    //     image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    //
    // });

});

export default uploadController;