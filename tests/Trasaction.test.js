const request = require('supertest');
const app = require('../index');
let userToken = "eyJhbGciOiJIUzI1NiJ9.NQ.fTkwv649RbxOl-18OjhSqU8qqsPQlnqb1IdH21zwU_g";


describe("check my transaction  api  test cases ", () => {
    it("tests /api/transactions/5 for response 200 succesfull get transactions list ", async () => {
        const response = await request(app)
        .get("/api/transactions/5")
        .auth(userToken, {type: 'bearer'})
        expect(response.statusCode).toBe(200)
    }) 
});