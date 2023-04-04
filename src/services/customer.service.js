import Customer from '../models/customer.model';

export const addCustomerDetails = async (body, userId) => {
  let customer = await Customer.findOne({ userId: userId });
  console.log('customer--------->', customer);
  if (!customer) {
    customer = await Customer.create({
      userId: body.userId,
      address: [
        {
          fullName: body.fullName,
          phoneNumber: body.phoneNumber,
          type: body.type,
          address: body.address,
          pinCode: body.pinCode,
          city: body.city,
          state: body.state
        }
      ]
    });
    return customer;
  }
  let newCustomer;
  if (body.addressIdx >= 0) {
    const updateExistingAddress = {};
    updateExistingAddress[`address.${body.addressIdx}.fullName`] = body.fullName;
    updateExistingAddress[`address.${body.addressIdx}.phoneNumber`] = body.phoneNumber;
    updateExistingAddress[`address.${body.addressIdx}.addressType`] = body.addressType;
    updateExistingAddress[`address.${body.addressIdx}.address`] = body.address;
    updateExistingAddress[`address.${body.addressIdx}.pinCode`] = body.pinCode;
    updateExistingAddress[`address.${body.addressIdx}.city`] = body.city;
    updateExistingAddress[`address.${body.addressIdx}.state`] = body.state;

    newCustomer = await Customer.updateOne(
      { _id: customer._id },
      {
        $set: updateExistingAddress
      }
    );
  } else {
    newCustomer = await Customer.updateOne(
      { _id: customer._id },
      {
        $push: {
          address: {
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            addressType: body.addressType,
            address: body.address,
            pinCode: body.pinCode,
            city: body.city,
            state: body.state
          }
        }
      }
    );
  }
  return newCustomer;
};

//get single customer
export const getCustomer = async (userID) => {
      const data = await Customer.find({userId: userID});
      if (data) {
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    };

    
