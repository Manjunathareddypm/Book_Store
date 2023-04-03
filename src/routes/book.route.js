import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();

//route to get all users
router.get('', bookController.getAllBooks);

//route to get a single user by their user id
router.get('/:_id', userAuth, bookController.getBook);


export default router;
