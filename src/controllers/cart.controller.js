import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

/**
 * Controller to add book to cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBookToCart = async (req, res, next) => {
  try {
    const data = await CartService.addBookToCart( req.body.userId, req.params._Id );
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Cart created successfully'
      });
    } 
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Cart is not created`
    });
  }
};

/**
 * Controller to get book from cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBookFromCart = async (req, res, next) => {
  try {
    const cart = await CartService.getBookFromCart(req.body.userId);
    if (cart) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: cart,
        message: 'Cart fetched successfully'
      });
    } 
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Cart is not available for this user id`
    });
  }
};


// **
//  * Controller to remove book from cart
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
export const removeBookFromCart = async (req, res, next) => {
  try {
    const data = await CartService.removeBookFromCart(req.body.userId,req.params._Id);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book is removed from cart'
      });
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `book is not removed from cart`
    });
  }
};
