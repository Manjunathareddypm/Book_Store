import Book from '../models/book.model';

//get all books
export const getAllBooks = async () => {
        const data = await Book.find();
    return data;
  
    }


//get single book
export const getBook = async (_id) => {
  const data = await Book.findById(_id);
  return data;
};



