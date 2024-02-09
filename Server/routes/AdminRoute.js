import express from 'express';
import con from '../utils/db.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const email = result[0].email;
            const token = Jwt.sign(
                { role: "admin", email: email },
                'jwt_secretkey',
                { expiresIn: '1h' }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid Email or Password' });
        }
    });
    console.log(req.body);
});

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/profile');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})



router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as adminRouter };