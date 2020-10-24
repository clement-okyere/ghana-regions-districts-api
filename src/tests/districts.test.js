const request = require('supertest');
const { getMaxListeners } = require('../../app');
const { Region } = require('../models/region');
const { District } = require('../models/district');
let server; 

describe('/districts', () => {
    beforeEach(() => { server = require('../../app'); });
    afterEach(async () => {
        await Region.remove({});
        await District.remove({});
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

        it("should return all districts", async () => {
        let region = await Region.find({ name: "Ashanti" }).limit(1);
        let district = new District({
            name: "Asokore Mampong",
            capital: "Asokore Mampong",
            region: region._id,
        });
        
        district.save()
            const res = await request(server).get('/districts');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(g => g.name === "Asokore Mamponng")).toBeTruthy();
        })
    })
})