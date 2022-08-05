import AdminController from "../controller/v1/admin.controller";
import jest from "jest";
test("testing register", () => {
  const req = {
      body: {
        name: "Ali",
        email: "me@example.com",
        password: "string",
        phoneNumber: "07546555354",
        premission: "User",
      },
    },
    res = { render: jest.fn() };
  AdminController.register(req, res);
  expect(res.registerToken).toBe("Ok");
});
