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


let user = require("../app/controllers/user");

describe("users api  test cases", () => {
    test("create user api", async() => {
    let data = {
        body:{
        name: "user",
        email: "user@gmail.co",
        password: "user123"
        }
    }
    var result = await user.createUser(data)
    expect(result).toBe({
        message: "user created successfully"
    });

    })
});
  













