import express from 'express'
import multer from 'multer';
import multerConfig from './config/multer';
import { UserController } from './controllers/usercontroller';
import { EspacoController } from './controllers/espacocontroller';
import { ReservasController } from './controllers/reservascontroller';
const userController = new UserController();
const espacoController = new EspacoController();
const reservasController = new ReservasController();
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

///reservas
routes.get('/reservas', reservasController.index)
routes.get('/reservasjoin/:id_usuario', reservasController.indexJoinReservasUser)
routes.get('/horariosindisponiveis/:id_espaco', reservasController.verificandoHorariosIndisponiveisEspaco)
routes.post('/reservas', reservasController.create)
routes.delete('/reservas/:id', reservasController.delete)


export default routes;