const { JsonWebTokenError } = require('jsonwebtoken');
const request = require('supertest');
const app = require('../index');
let adminToken = "eyJhbGciOiJIUzI1NiJ9.MQ.4lVSpkyP5NOVEQxgig1DirPwawN8C7TLTt_3xNAOC7Y";
let userToken = "eyJhbGciOiJIUzI1NiJ9.NQ.fTkwv649RbxOl-18OjhSqU8qqsPQlnqb1IdH21zwU_g";

describe("create accounts api  test cases ", () => {
    it("tests /api/accounts for response 201 success create accounts", async () => {
        const response = await request(app)
            .post("/api/accounts")
            .auth(adminToken, { type: 'bearer' })
            .send({
                type: "saving",
                amount: 3000,
                userId: 7
            })
        expect(response.body).toEqual({
            message: 'Account created successfully'
        })
        expect(response.statusCode).toBe(201)
    })

    it("tests /api/accounts for response 201 success create accounts", async () => {
        const response = await request(app)
            .post("/api/accounts")
            .auth(adminToken, { type: 'bearer' })
            .send({
                type: "saving",
                amount: "",
                userId: ""
            })
        expect(response.body).toEqual({
            message: 'please enter all required fileds'
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/users for response 401 unautherized create accounts", async () => {
        const response = await request(app)
            .post("/api/accounts")
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

})

describe("create deposit api  test cases ", () => {
    it("tests /api/deposit for response 200 success deposit amount", async () => {
        const response = await request(app)
            .patch("/api/deposit")
            .auth(userToken, { type: 'bearer' })
            .send({
                accountNo: 100000000,
                amount: 1000
            })
        expect(response.body).toEqual({
            message: "amount deposit successfully"
        })
        expect(response.statusCode).toBe(200)
    })

    it("tests /api/deposit for response 4000 bad request deposit amount", async () => {
        const response = await request(app)
            .patch("/api/deposit")
            .auth(userToken, { type: 'bearer' })
            .send({
                accountNo: "",
                amount: 1000
            })
        expect(response.body).toEqual({
            message: "please all required details"
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/deposit for response 401 unautherized deposit amount", async () => {
        const response = await request(app)
            .patch("/api/deposit")
            .send({
                accountNo: 100000000,
                amount: 1000
            })
        expect(response.statusCode).toBe(401)
    })

})


describe("create withdraw api test cases ", () => {
    // jest.setTimeout(5*1000)
    it("tests /api/withdraw for response 200 success withdraw amount", async () => {
        const response = await request(app)
            .patch("/api/withdraw")
            .auth(userToken, { type: 'bearer' })
            .send({
                accountNo: 100000000,
                amount: 1000
            })
        expect(response.body).toEqual({
            message: " amount withdraw successfully"
        })
        expect(response.statusCode).toBe(200)
    })

    it("tests /api/withdraw for response 200 bad request withdraw amount", async () => {
        const response = await request(app)
            .patch("/api/withdraw")
            .auth(userToken, { type: 'bearer' })
            .send({
                accountNo: 100000000,
                amount: ""
            })
        expect(response.body).toEqual({
            message: "please all  required details"
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/withdraw for response 400 bad request withdraw amount", async () => {

        const response = await request(app)
            .patch("/api/withdraw")
            .auth(userToken, { type: 'bearer' })
            .send({
                accountNo: 100000000,
                amount: 100000000
            })
        expect(response.body).toEqual({
            message: "insufficient balance"
        })
        expect(response.statusCode).toBe(400)
    })

    it("tests /api/withdraw for response 400 bad request withdraw amount", async () => {
        const response = await request(app)
            .patch("/api/withdraw")
            .auth(userToken, { type: 'bearer' })
            .send({
                accountNo: 1000000,
                amount: 1000
            })
        expect(response.body).toEqual({
            message: "account not exist"
        })
        expect(response.statusCode).toBe(404)
    })

    it("tests /api/withdraw for response 401 unautherized withdraw amount", async () => {
        const response = await request(app)
            .patch("/api/withdraw")
            .send({
                accountNo: 100000000,
                amount: 1000
            })
        expect(response.statusCode).toBe(401)
    })

})
