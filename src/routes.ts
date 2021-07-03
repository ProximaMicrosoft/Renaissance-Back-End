import express from 'express'

import UserController from './controllers/usercontroller';
const userController = new UserController();
const routes = express.Router();

///usuario
routes.get('/usuario', userController.index)
routes.post('/usuario', userController.create)
routes.post('/login', userController.login)
routes.put('/usuario/:id', userController.update)
routes.delete('/usuario/:id', userController.delete)

export default routes;