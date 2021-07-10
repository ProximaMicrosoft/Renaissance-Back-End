import express from 'express'
import routes from './routes';
import path from 'path';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(cors());
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.get('/', async function (req, res) {
    res.json({ "oi": "oi" })
});

app.listen(process.env.PORT || 5000, () => { console.log('Server is running') })

