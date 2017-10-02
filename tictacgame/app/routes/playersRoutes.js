import express from 'express';
import playersController from '../controllers/playersController';

const initPlayersRoutes = () => {
  let playersRoutes = express.Router();

  playersRoutes.get('/:id', playersController.stats);
  playersRoutes.post('/', playersController.add);
 
  return playersRoutes;
};

export default initPlayersRoutes;