const request = require("supertest");
const app = require("../app");

describe("users api  test cases ", () => {

    it("tests /api/users for response 201 succesfull add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "kapil1",
                email: "kapil4@gmail.com",
                password: "kapil"
            })
        expect(response.body).toEqual({
            message: "user created successfully"
        })
        expect(response.statusCode).toBe(201)
    });
    it("tests /api/users for response 201 succesfull add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "",
                email: "kapil4@gmail.com",
                password: "kapil"
            })
        expect(response.body).toEqual({
            message: "please provide all required fields and their value"
        })
        expect(response.statusCode).toBe(400)
    });
    it("tests /api/users for response 201 succesfull add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "kapil",
                email: "kapil4gmail.com",
                password: "kapil"
            })
        expect(response.body).toEqual({
            message: "please enter vaild email"
        })
        expect(response.statusCode).toBe(400)
    });

});