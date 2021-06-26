import express from 'express'
import routes from './routes';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(express.json())
app.use(routes)
app.use(express.static(path.join(__dirname, "..", "public")))


app.get('/', async function (req, res) {
    res.json({ "oi": "oi" })
});

app.listen(process.env.PORT || 5000, () => console.log('Server is running'))

