export default class Validation {
  constructor(parameters: any) {}
  static register = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
    phoneNumber: {
      presence: must,
      type: "string",
    },
    permission: {
      presence: false,
      type: "string",
    },
  });
  static login = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static superAdmin = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static otp = (must = true) => ({
    otp: {
      presence: must,
      type: "number",
    },
  });
}
