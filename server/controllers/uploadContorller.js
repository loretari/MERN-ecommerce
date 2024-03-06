import express from "express";
import multer from "multer";
import path from "path";


const uploadController = express.Router();

const storage = multer.diskStorage({
    destination: './public/images',
    fileName: (req, file, cb ) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
    // same as storage: storage
})

  uploadController.post('/image', upload.single('product'), (req, res) => {
      res.json({
          success: 1,
          image_url: `http://localhost: ${process.env.PORT}/images/${req.file.filename}`
      })
  })

export default uploadController;