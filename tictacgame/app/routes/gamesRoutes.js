import express from 'express';
import gamesController from '../controllers/gamesController';

const initGamesRoutes = () => {
  let gamesRoutes = express.Router();

  gamesRoutes.get('/:id', gamesController.show);
  gamesRoutes.post('/', gamesController.add);
  gamesRoutes.put('/join/:id', gamesController.join);
  gamesRoutes.put('/player1/:id', gamesController.movePlayer1);
  gamesRoutes.put('/player2/:id', gamesController.movePlayer2);
  
  return gamesRoutes;
};

export default initGamesRoutes;