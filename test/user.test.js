// const request = require("supertest");
// const app = require("../index");

// let adminToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.C6LZjUTNmJ4Fvm5Q836_E14NmcTH2k81AzXhh5kI-Vg";
// // // create users test cases
// describe("users api  test cases ", () => {
//     jest.setTimeout(7000);
//     it("tests /api/users for response 201 succesfull add user", async () => {
//         const response = await request(app)
//             .post("/api/users")
//             .auth(adminToken, { type: 'bearer' })
//             .send({
//                 name: "kapil3",
//                 email: "kapil7@gmail.com",
//                 password: "kapil"
//             }).set( "Cookie",  adminToken)
//         expect(response.body).toEqual({
//             message: "user created successfully"
//         })
//         expect(response.statusCode).toBe(201)
//     });

// });

let user = require("../app/services/user");

// create user api  test cases
describe("users create api test cases", () => {
  test("user created successfully user api", async () => {
    let data = {
      name: "user",
      email: "user@gmail.co",
      password: "user123",
    };
    let callback = () => {
      return { message: "user created successfully" }, 201;
    };
    var result = await user.register(data, callback);
    expect(result).toBe(201);
    // expect(result).toBe({ message: "user created successfully" });
  });

  test("created user with empty name user api", async () => {
    let data = {
      name: "",
      email: "user@gmail.co",
      password: "user123",
    };
    let callback = () => {
      return { message: "enter valid name" }, 400;
    };
    var result = await user.register(data, callback);
    expect(result).toBe(400);
  });

  test("created with invalid email user api", async () => {
    let data = {
      name: "user",
      email: "usergmail.co",
      password: "user123",
    };
    let callback = () => {
      return { message: "please enter valid email" }, 400;
    };
    var result = await user.register(data, callback);
    expect(result).toBe(400);
  });

  test("created with duplicate email user api", async () => {
    let data = {
      name: "user",
      email: "user@gmail.co",
      password: "user123",
    };
    let callback = () => {
      return { message: "user already exist" }, 409;
    };
    var result = await user.register(data, callback);
    expect(result).toBe(409);
  });
       
});
