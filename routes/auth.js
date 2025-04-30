import express from 'express';
import { loginUser, logoutUser, registerUser, userProfile } from '../controllers/auth.js';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/userImages')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.get("/logout",logoutUser);
router.get('/profile', userProfile);

export default router;