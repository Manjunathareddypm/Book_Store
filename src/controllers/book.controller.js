import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

// /**
//  * Controller to get all books available
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
export const getAllBooks = async (req, res, next) => {
  try {
    const data = await bookService.getAllBooks();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All books fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

// /**
//  * Controller to get a single book
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
export const getBook = async (req, res, next) => {
  try {
    const data = await bookService.getBook(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

// /**
//  * Controller to create a new user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const newUser = async (req, res, next) => {
//   try {
//     const data = await UserService.newUser(req.body);
//     res.status(HttpStatus.CREATED).json({
//       code: HttpStatus.CREATED,
//       data: data,
//       message: 'User created successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Controller to update a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const updateUser = async (req, res, next) => {
//   try {
//     const data = await UserService.updateUser(req.params._id, req.body);
//     res.status(HttpStatus.ACCEPTED).json({
//       code: HttpStatus.ACCEPTED,
//       data: data,
//       message: 'User updated successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Controller to delete a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const deleteUser = async (req, res, next) => {
//   try {
//     await UserService.deleteUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: [],
//       message: 'User deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };
