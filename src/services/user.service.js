import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";
import * as util from '../utils/util';



//create new user
export const newRegistration = async (body) => {
  var stat;
  const res = await User.findOne({email: body.email})
  if(res == null ){
  const saltRounds = 10;
  const hashpassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashpassword;
  const data = await User.create(body);
  stat = {
    code: HttpStatus.CREATED,
    data: data,
    message: 'User Registered successfully'
  }
  }else{
    stat = {
      code: HttpStatus.BAD_REQUEST,
      data: "data",
      message: 'User already registered'
    }
  }
  return stat
};

//user Login

export const userLogin = async (body) => {
  var token;
  const data = await User.findOne({email: body.email})
  if(data){
    const pswd = await bcrypt.compare(body.password, data.password);
    if (pswd) {
      const token = jwt.sign(
        { email: data.email,  _id: data._id },
        process.env.SECRET_KEY
      );
      // data.token = token
      return token
      } else {
        throw new Error('incorrect password ');
      }
    } else {
      throw new Error('Invalid email');
    }
  };
  
  
