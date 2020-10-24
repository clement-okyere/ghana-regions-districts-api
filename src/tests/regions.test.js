const request = require('supertest');
const { getMaxListeners } = require('../../app');
const { Region } = require('../models/region');
let server; 

describe('/regions', () => {
    beforeEach(() => { server = require('../../app'); });
    afterEach(async () => {
        await Region.remove({});
        await server.close()
    })
    describe('GET /', () => {
        Region.collection.insertMany([
            {
                name: "Ashanti",
                capital: "Kumasi"
            },
            {
                name: "Bono",
                capital: "Techiman"
            }
        ]);

        it("should return all regions", async () => {
            const res = await request(server).get('/regions');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === "Ashanti")).toBeTruthy();

        })
    })
})