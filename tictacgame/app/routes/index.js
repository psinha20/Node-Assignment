import initPlayersRoutes from './playersRoutes';
import initGamesRoutes from './gamesRoutes';


const initRoutes = (app) => {
  app.use('/games',initGamesRoutes());
  app.use('/players', initPlayersRoutes());
};

export default initRoutes;