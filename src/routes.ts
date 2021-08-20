import express from 'express'
import multer from 'multer';
import multerConfig from './config/multer';
import { UserController } from './controllers/usercontroller';
import { EspacoController } from './controllers/espacocontroller';
import { ReservasController } from './controllers/reservascontroller';
import { RegrasController } from './controllers/regrascontroller';
import { MailerController } from './controllers/mailercontroller';

const userController = new UserController();
const espacoController = new EspacoController();
const reservasController = new ReservasController();
const regrasController = new RegrasController();
const mailerController = new MailerController();
const routes = express.Router();
const upload = multer(multerConfig);

///usuario
routes.get('/usuario', userController.index)
routes.post('/usuario', userController.create)
routes.post('/login', userController.login)
routes.put('/usuario/:id', userController.update)
routes.delete('/usuario/:id', userController.delete)

///espaco
routes.get('/espaco', espacoController.index)
routes.post('/espaco', upload.single('fotoespaco'), espacoController.create)
routes.put('/espaco/:id', espacoController.update)
routes.delete('/espaco/:id', espacoController.delete)

///regras
routes.get('/regras', regrasController.index)
routes.post('/regras', upload.single('arquivo'), regrasController.create)
routes.delete('/regras/:id', regrasController.delete)

///reservas
routes.get('/reservas', reservasController.index)
routes.get('/reservasjoin/:id_usuario', reservasController.indexJoinReservasUser)
routes.get('/horariosindisponiveis/:id_espaco', reservasController.verificandoHorariosIndisponiveisEspaco)
routes.post('/reservas', reservasController.create)
routes.delete('/reservas/:id', reservasController.delete)

//mailer
routes.post('/recuperarsenha', mailerController.recuperarSenhaEmail)


export default routes;