import express from 'express'

import UserController from './controllers/usercontroller';
const userController = new UserController();
const routes = express.Router();

///fucionario
routes.get('/funcionario', userController.index)
routes.post('/funcionario', userController.create)

export default routes;