import express from 'express';
const router = express.Router();
import {addressValidation} from '../validators/customer.validator'
import * as customerController from '../controllers/customer.controller';
import { userAuth } from "../middlewares/auth.middleware";


//route to get customer
router.get('', userAuth, customerController.getCustomer);

//route to get all books
router.post('/addAddress',userAuth, addressValidation, customerController.addCustomerDetails);

export default router;