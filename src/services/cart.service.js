import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

//adding book to cart
export const addBookToCart = async (userId, _Id) => {
  const book = await BookService.getBook(_Id);
  if (!book && book.quantity <= 1) {
    throw new Error('Book Not Available ');
  }
  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    cart = await Cart.create({
      userId: userId,
      books: [
        {
          productID: book._id,
          description: book.description,
          bookName: book.bookName,
          author: book.author,
          quantity: 1,
          price: book.price
        }
      ],
      cartTotal: book.price
    });
    return cart;
  }

  var bookExists = false;
  let i;
  for (i = 0; i < cart.books.length; i++) {
    if (cart.books[i].productID == book._id) {
      bookExists = true;
      break;
    }
  }

  let newCart;
  if (bookExists) {
    const bookObj = {};
    bookObj['books.' + i + '.quantity'] = 1;
    bookObj['books.' + i + '.price'] = book.price;
    bookObj['cartTotal'] = book.price;

    newCart = Cart.updateOne({ _id: cart._id }, { $inc: bookObj });
  } else {
    newCart = Cart.updateOne(
      { _id: cart._id },
      {
        $push: {
          books: {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            price: book.price,
            
          }
        },
        $inc: {
          cartTotal: book.price
        }
      }
    );
  }
  return newCart;
};

//get user cart

export const getBookFromCart = async (userID) => {
  const data = await Cart.findOne({ userId: userID, isPurchased: false });
  return data;
};


//remove book from cart

export const removeBookFromCart = async (userID,_Id,isAllBooks = false) => {
    const book = await BookService.getBook(_Id);
    if (!book) {
      throw new Error('Book not found');
    }
    var cart = await Cart.findOne({ userId: userID });
  
    if (!cart) {
      throw new Error('Book is not available in cart');
    }
    
    let bookExisting = false;
    let i;
    for (i = 0; i < cart.books.length; i++) {
      if (cart.books[i].productID == _Id) {
        bookExisting = true;
        break;
      }
    }
    let newCart;
    if (bookExisting) {
      if ( cart.books[i].quantity == 1 || cart.books[i].quantity == 0 || isAllBooks ) {

        newCart = Cart.updateOne(
          { _id: cart._id },
          {
            $pull: {
              books: {
                productID: book.id
              }
            },
            $inc: {
              cartTotal: -(book.price * cart.books[i].quantity)
            }
          }
        );
      } else {
        const bookObj = {};
        bookObj['books.' + i + '.quantity'] = -1;
        bookObj['cartTotal'] = -book.price;
        newCart = Cart.updateOne({ _id: cart._id }, { $inc: bookObj });
      }
    }
    return newCart;
  };
