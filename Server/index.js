import express from 'express';
import cors from 'cors';
import { adminRouter } from './routes/AdminRoute.js';


const app = express();

var whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    corsOptions = {
        ...corsOptions,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
// app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/api', adminRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

