const { getAll, post, deleteOne, updateOne, getOne } = require('../controllers/user.controllers')

const express = require('express'),
    path = require("path"),
    multer = require("multer"),
    router = express.Router()

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.route('/').get(getAll).post(upload.single("profileImage"), post)

router.route('/:id').get(getOne).put(updateOne).delete(deleteOne)

module.exports = router