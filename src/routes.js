import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';
import AvailableDeliveries from './app/controllers/AvailableDeliveries';
import WithdrawDeliveries from './app/controllers/WithdrawDeliveries';
import FinishDeliveries from './app/controllers/FinishDeliveries';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);

routes.get('/deliverymen/:id', DeliverymanController.show);
routes.get('/deliverymen/:id/deliveries', AvailableDeliveries.index);

routes.get('/problems', DeliveryProblemController.index);
routes.post('/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.destroy);

routes.put('/deliveries/start-delivery/:id', WithdrawDeliveries.update);
routes.put('/deliveries/finish-delivery/:id', FinishDeliveries.update);

routes.get('/deliveries/', DeliveryController.index);
routes.post('/deliveries/', DeliveryController.store);
routes.get('/deliveries/:id', DeliveryController.show);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

routes.get('/problems/:id', DeliveryProblemController.show);
routes.put('/problems/:id', DeliveryProblemController.update);
routes.delete('/problems/:id', DeliveryProblemController.destroy);

routes.delete(
  '/problems/:id/cancel-delivery',
  CancelDeliveryController.destroy
);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

export default routes;
