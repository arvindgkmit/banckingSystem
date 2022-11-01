const request = require('supertest');
const app = require('../index');
let adminToken = "eyJhbGciOiJIUzI1NiJ9.MQ.4lVSpkyP5NOVEQxgig1DirPwawN8C7TLTt_3xNAOC7Y";
let userToken = "eyJhbGciOiJIUzI1NiJ9.NQ.fTkwv649RbxOl-18OjhSqU8qqsPQlnqb1IdH21zwU_g";
// signup api test cases
describe("users api  test cases ", () => {
    it("tests /api/users for response 201 succesfull add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .auth(adminToken, { type: 'bearer' })
            .send({
                name: "arvind1",
                email: "arvind123@gmail.com",
                password: "arvind@123"
            })
        expect(response.body).toEqual({
            message: "user added successfully"
        })
        expect(response.statusCode).toBe(201)
    })

    it("tests /api/users for response 400 bad request add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .auth(adminToken, { type: 'bearer' })
            .send({
                name: "",
                email: "arvind123@gmail.com",
                password: "arvind@123"
            })
        expect(response.body).toEqual({
            message: "plesae enter all required fields"
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/users for response 500 internal server error add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .auth(adminToken, { type: 'bearer' })
        expect(response.statusCode).toBe(500)
    })

    it("tests /api/users for response 401 unautherized add user", async () => {
        const response = await request(app)
            .post("/api/users")
            .auth(userToken, { type: 'bearer' })
            .send({
                name: "arvind1",
                email: "arvind123@gmail.com",
                password: "arvind@123"
            })
        expect(response.body).toEqual({
            message: "Admin access required"
        })
        expect(response.statusCode).toBe(401)
    })

});



describe("get all users api  test cases ", () => {
    it("tests /api/users for response 200 succesfull get all users ", async () => {
        const response = await request(app)
            .get("/api/users")
            .auth(adminToken, { type: 'bearer' })
        expect(response.statusCode).toBe(200)
    })

    it("tests /api/users for response 401 unautherized get all user", async () => {
        const response = await request(app)
            .get("/api/users")
            .auth(userToken, { type: 'bearer' })
        expect(response.body).toEqual({
            message: "Admin access required"
        })
        expect(response.statusCode).toBe(401)
    })

});


describe("get single users api  test cases ", () => {
    it("tests /api/users/5 for response 200 succesfull get single users ", async () => {
        const response = await request(app)
            .get("/api/users/5")
            .auth(adminToken, { type: 'bearer' })
        expect(response.statusCode).toBe(200)
    })

    it("tests /api/users for response 401 unautherized get asinglell user", async () => {
        const response = await request(app)
            .get("/api/users/5")
        expect(response.statusCode).toBe(401)
    })

});


describe("close users account api test cases ", () => {
    it("tests /api/users/5 for response 204 not content close users account ", async () => {
        const response = await request(app)
            .delete("/api/users/5")
            .auth(adminToken, { type: 'bearer' })
        expect(response.statusCode).toBe(204)
    })

    it("tests /api/users for response 401 unautherized close users account", async () => {
        const response = await request(app)
            .delete("/api/users/5")
            .auth(userToken, { type: 'bearer' })
        expect(response.body).toEqual({
            message: "Admin access required"
        })
        expect(response.statusCode).toBe(401)
    })

});


describe("login user api test cases ", () => {
    it("tests /api/login for response 200 success login user ", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "arvind@gmail.com",
                password: "arvind"
            })
        expect(response.body).toEqual({
            message: "login successfully",
            token: "eyJhbGciOiJIUzI1NiJ9.NQ.fTkwv649RbxOl-18OjhSqU8qqsPQlnqb1IdH21zwU_g"
        })
        expect(response.statusCode).toBe(200)
    })

    it("tests /api/login for response 404 not fount login manager ", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "manager1@gmail.com",
                password: "manager"
            })
        expect(response.body).toEqual({
            message: "user not found"
        })
        expect(response.statusCode).toBe(404)
    })

    it("tests /api/login for response 400 bad request login user ", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "arvind@gmail.com",
                password: ""
            })
        expect(response.body).toEqual({
            message: "please enter all the required fields"
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/login for response 400 bad request login user ", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "arvind@gmail.com",
                password: "1234"
            })
        expect(response.body).toEqual({
            message: "incorrect password"
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/login for response 400 bad request login user ", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                email: "arvind@dghgmail.com",
                password: "1234"
            })
        expect(response.body).toEqual({
            message: "user not found"
        })
        expect(response.statusCode).toBe(404)
    })

});


describe("logout account api test cases ", () => {
    it("tests /api/users/5 for response 200 success logout ", async () => {
        const response = await request(app)
            .post("/api/logout")
            .auth(userToken, { type: 'bearer' })
        expect(response.body).toEqual({
            message: "Logout Successfully"
        })
        expect(response.statusCode).toBe(200)
    })

});  