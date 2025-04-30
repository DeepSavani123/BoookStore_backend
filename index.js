import 'dotenv/config';
import './config/dbConnect.js';
import express from 'express';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use('/image', express.static('public'));
app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})