class User {
  constructor(
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
  ) {
    this.id = id;
    this.loginUUID = loginUUID;
    this.userEmail = userEmail;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.displayName = displayName;
    this.addressStreetNumber = addressStreetNumber;
    this.addressStreet = addressStreet;
    this.addressSuburb = addressSuburb;
    this.addressPostCode = addressPostCode;
    this.addressState = addressState;
    this.addressCountry = addressCountry;
  }
};

export default User;