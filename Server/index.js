import express from 'express';
import cors from 'cors';
import { adminRouter } from './routes/AdminRoute.js';


const app = express();

var whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
app.use(cors(corsOptions));
// app.use(cors());

app.use(express.json());

app.use('/api', adminRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

