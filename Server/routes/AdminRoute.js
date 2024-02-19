import express from 'express';
import con from '../utils/db.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

const mul = multer()

router.post("/auth", mul.any(), (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE email = ?";
    con.query(sql, [email], async (err, result) => {
        if (err) return res.json({ loginStatus: false, error: "Query error" });
        if (result.length > 0) {
            const hashedPassword = result[0].password;
            try {
                const match = await bcrypt.compare(password, hashedPassword);
                if (match) {
                    const user = { ...result[0] };
                    delete user.password;
                    const token = Jwt.sign(
                        { id: user.id, role: user.role, email: user.email, dob: user.dob },
                        "jwt_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ Status: true, bearer: token, user: user });
                } else {
                    return res.json({ loginStatus: false, error: "Wrong email or password", data: req.body });
                }
            } catch (error) {
                console.error("Password comparison error:", error);
                return res.json({ loginStatus: false, error: "Internal server error", data: req.body });
            }
        } else {
            return res.json({ loginStatus: false, error: "Wrong email or password", data: req.body });
        }
    });
});

router.get('/users', (req, res) => {
    
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        // Update image paths with localhost URL
        // const updatedResult = result.map(user => {
        //     return {
        //         ...user,
        //         profile_pic: `${localhostUrl}/public/images/profile/${user.profile_pic}`
        //     };
        // });
        return res.json({ Status: true, data: result })
    })
})

router.get('/user/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, data: result })
    })
})

router.post('/update_user/:id', (req, res) => {
    const sql = `UPDATE users SET ? WHERE id = ?`;
    con.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

router.get('/delete_user/:id', (req, res) => {
    const sqlSelectImage = "SELECT profile_pic FROM users WHERE id = ?";
    const sqlDeleteUser = "DELETE FROM users WHERE id = ?";
    con.query(sqlSelectImage, [req.params.id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" });
        }
        if (result.length === 0) {
            return res.json({ Status: false, Error: "User not found" });
        }

        const filename = result[0].profile_pic;
        con.query(sqlDeleteUser, [req.params.id], (err, result) => {
            if (err) {
                return res.json({ Status: false, Error: "Query Error" });
            }

            const imagePath = path.join(__dirname, 'public/images/profile', filename);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                    return res.json({ Status: false, Error: "Error deleting image file" });
                }

                return res.json({ Status: true });
            });
        });
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM categories";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, data: result })
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/profile');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});
router.post('/add_user', upload.single('profile_pic'), (req, res) => {
    const sql = `INSERT INTO users 
    (role, name, email, mobile, password, address, profile_pic, dob, profession, department)
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            parseInt(req.body.role),
            req.body.name,
            req.body.email,
            parseInt(req.body.mobile),
            hash,
            req.body.address,
            req.file.filename,
            req.body.dob,
            req.body.profession,
            req.body.department
        ]
        res.json({ Status: true, data: values })
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as adminRouter };