const express = require('express');
const router = express.Router();
const userController = require('../controller/userContoller');
const multer = require('multer');

const configImg = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, "./uploads")
    },
    filename: (req, file, callback)=> {
        callback(null,`image-${Date.now()}${file.originalname}`)
    }
})

const isImage = (req, file, callback)=> {
    if(file.mimetype.startsWith("image")){
        callback(null, true)
    }else {
        callback(null, false)
        callback(new Error("Image allowed only"))
    }
}

const upload = multer({
    storage: configImg,
    fileFilter : isImage
})

router.post('/saveuser',upload.single("photo"),userController.saveUser)
router.get('/getallusers',userController.getAllUsers)
router.get('/getsingleuser/:id', userController.getSingleUser)
router.put('/getupdateuser/:id',upload.single("photo"), userController.getUpdateUser)
router.delete('/getdeleteuser/:id', userController.getDeleteUser)

module.exports = router