import express from 'express';
const router = express.Router();
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import customerRoute from './customer.route';

import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  router.use('/books', bookRoute);

  router.use('/cart', cartRoute);

  router.use('/wishlist', wishlistRoute);

  router.use('/customers', customerRoute);

  return router;
};

export default routes;
