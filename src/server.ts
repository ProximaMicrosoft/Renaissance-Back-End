import express from 'express'
import routes from './routes';
import path from 'path';
import cors from 'cors'
import { Criptografia } from './utils/criptografia/criptografia';
import { Espaco } from './models/espaco'
import { User } from './models/user'
import jwt from 'jsonwebtoken'
import fs from 'fs'

import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})



dotenv.config();
const app = express()
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.get('/cadastrodevisitas', async function (req, res) {
    const espaco = new Espaco()
    const usuarios = new User()
    var listadeespacos =
        await espaco.SelectEspaco()
    var listadeusuario = await usuarios.SelectUser()
    res.render('cadastroagendamentos.ejs', { espacos: listadeespacos, usuarios: listadeusuario });
});
const cripto = new Criptografia();
var token = jwt.sign({ foo: 'bar' }, process.env.CHAVE, { expiresIn: '1h' });
console.log(token)
console.log(cripto.VericaHashSenha("####56567687879", "$2b$10$BWuYYH42HdgfOplpJCoMuO", "$2b$10$sxbpcv.FfJbGnmYEJFXXuOTjpLfYAY/dX4SWa.P7dlmWGSS/6txmu"))

app.get('/', async function (req, res) {
    res.json({ "oi": "oi" })
});

app.listen(process.env.PORT || 5000, () => { console.log('Server is running') })

