import Book from '../models/book.model';

//get all users
export const getAllBooks = async () => {
        const data = await Book.find();
    return data;
  
    }


//get single user
export const getBook = async (_id) => {
  const data = await Book.findById(_id);
  return data;
};



// //create new user
// export const newUser = async (body) => {
//   const data = await User.create(body);
//   return data;
// };

// //update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

