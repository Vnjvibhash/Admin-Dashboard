import express from 'express';
import con from '../utils/db.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

const mul = multer()

router.post('/adminlogin', mul.any(), (req, res) => {
    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = { ...result[0] };
            delete user.password;
            const token = Jwt.sign(
                { role: "admin", email: user.email },
                'jwt_secretkey',
                { expiresIn: '1h' }
            );
            res.cookie('token', token);
            return res.json({ Status: true, bearer: token, user: user });
        } else {
            return res.json({ Status: false, Error: 'Invalid Email or Password' });
        }
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM categories";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, data: result })
    })
})

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