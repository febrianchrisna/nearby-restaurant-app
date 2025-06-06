import User from './UserModel.js';
import Restaurant from './RestaurantModel.js';

// User model is standalone - only used for authentication and profile
// Restaurant model is standalone - read-only for displaying restaurants

export {
  User,
  Restaurant
};
