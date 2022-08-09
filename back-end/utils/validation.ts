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
    otp: {
      presence: must,
      type: "number",
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
  static category = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string",
    },
    imgUrl: {
      presence: must,
      type: "string",
    },
  });
  static products = (must = true) => ({
    title: {
      presence: must,
      type: "string",
    },
    description: {
      presence: must,
      type: "string",
    },
    price: {
      presence: must,
      type: "number",
    },
    discount: {
      presence: must,
      type: "number",
    },
  });
}
