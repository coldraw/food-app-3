import User from '../../models/user';

export const DELETE_USER = 'DELETE_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_USERS = 'SET_USERS';

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://yum-lo-1.firebaseio.com/users.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong with USER retrieval!');
      }

      const resData = await response.json();
      const loadedUsers = [];

      for (const key in resData) {
        loadedUsers.push(
          new User(
            key,
            resData[key].loginUUID,
            resData[key].userEmail,
            resData[key].firstName,
            resData[key].lastName,
            resData[key].phoneNumber,
            resData[key].displayName,
            resData[key].addressStreetNumber,
            resData[key].addressStreet,
            resData[key].addressSuburb,
            resData[key].addressPostCode,
            resData[key].addressState,
            resData[key].addressCountry,
          )
        );
      }

      dispatch({ type: SET_USERS, users: loadedUsers })
      console.log('Users loaded');
    } catch (err) {
      // eg. send to analytics server
      throw err;
    }
  };

};

export const deleteUser = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/users/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong deleting the user');
    };
    dispatch({ type: DELETE_USER, uid: userId });
  }
};


export const createUser = (userEmail, firstName, lastName, phoneNumber, displayName, addressStreetNumber, addressStreet, addressSuburb, addressPostCode, addressState, addressCountry) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const loginUUID = getState().auth.userId;

    const response = await fetch(`https://yum-lo-1.firebaseio.com/users.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loginUUID,  /// SOMETHING ABOUT THIS NAME FIELD...
          userEmail,
          firstName,
          lastName,
          phoneNumber,
          displayName,
          addressStreetNumber,
          addressStreet,
          addressSuburb,
          addressPostCode,
          addressState,
          addressCountry,
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_USER,
      userData: {
        id,
        loginUUID,
        userEmail,
        firstName,
        lastName,
        phoneNumber,
        displayName,
        addressStreetNumber,
        addressStreet,
        addressSuburb,
        addressPostCode,
        addressState,
        addressCountry,
      }
    });
    console.log('user CREATED!');
  }
};

export const updateUser = (id, userEmail, firstName, lastName, phoneNumber, displayName, addressStreetNumber, addressStreet, addressSuburb, addressPostCode, addressState, addressCountry) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const loginUUID = getState().auth.userId;

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/users/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail,
          firstName,
          lastName,
          phoneNumber,
          displayName,
          addressStreetNumber,
          addressStreet,
          addressSuburb,
          addressPostCode,
          addressState,
          addressCountry,
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong! update user NOT WORKING');
    };

    const resData = await response.json();

    dispatch({
      type: UPDATE_USER,
      uid: id,
      userData: {
        userEmail,
        firstName,
        lastName,
        phoneNumber,
        displayName,
        addressStreetNumber,
        addressStreet,
        addressSuburb,
        addressPostCode,
        addressState,
        addressCountry,
      }
    });
  };
};
