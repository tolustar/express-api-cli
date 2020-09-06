import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';

const UserRoute = new userRoute();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', UserRoute.getRoutes());

  return router;
};

export default routes;
