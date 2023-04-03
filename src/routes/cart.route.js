import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get cart details
router.get('', userAuth, cartController.getBookFromCart);

//route to add book to cart
router.post('/add_book/:_Id', userAuth, cartController.addBookToCart); 

//route to remove book from cart
router.post('/remove_book/:_Id',userAuth,cartController.removeBookFromCart) 


export default router;