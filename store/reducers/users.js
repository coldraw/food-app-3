import { DELETE_USER, CREATE_USER, UPDATE_USER, SET_USERS } from '../actions/users';
import User from '../../models/user';

const initialState = {
  availableUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        availableUsers: action.users,
      };

    case CREATE_USER:
      const newUser = new User(
        action.userData.id,
        action.userData.loginUUID,
        action.userData.userEmail,
        action.userData.firstName,
        action.userData.lastName,
        action.userData.phoneNumber,
        action.userData.displayName,
        action.userData.addressStreetNumber,
        action.userData.addressStreet,
        action.userData.addressSuburb,
        action.userData.addressPostCode,
        action.userData.addressState,
        action.userData.addressCountry,
      );
      return {
        ...state,
        availableUsers: state.availableUsers.concat(newUser),
      };

    case UPDATE_USER:
      const userIndex = state.availableUsers.findIndex(
        user => user.id === action.uid
      );
      const updatedUser = new User(
        action.uid,
        state.availableUsers[userIndex].loginUUID,
        action.userData.userEmail,
        action.userData.firstName,
        action.userData.lastName,
        action.userData.phoneNumber,
        action.userData.displayName,
        action.userData.addressStreetNumber,
        action.userData.addressStreet,
        action.userData.addressSuburb,
        action.userData.addressPostCode,
        action.userData.addressState,
        action.userData.addressCountry,
      );
      const availableUserIndex = state.availableUsers.findIndex(
        user => user.id === action.uid
      );
      const updatedAvailableUsers = [...state.availableUsers];
      updatedAvailableUsers[availableUserIndex] = updatedUser;
      return {
        ...state,
        availableUsers: updatedAvailableUsers
      }

    case DELETE_USER:
      return {
        ...state,
        availableUsers: state.availableUsers.filter(
          user => user.loginUUID !== action.uid
        )
      };
  }
  return state;
};