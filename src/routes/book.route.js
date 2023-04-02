import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();

//route to get all users
router.get('', bookController.getAllBooks);

// //route to create a new user
// router.post('', newUserValidator, userController.newUser);

//route to get a single user by their user id
router.get('/:_id', userAuth, bookController.getBook);

// //route to update a single user by their user id
// router.put('/:_id', userController.updateUser);

// //route to delete a single user by their user id
// router.delete('/:_id', userController.deleteUser);

export default router;
