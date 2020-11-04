const request = require('supertest');
const { getMaxListeners } = require('../../app');
const { Region } = require('../models/region');
const { District } = require('../models/district');
let server; 

describe('/districts', () => {
    beforeEach(() => {
        server = require('../../app');
    });
    
        afterEach(async () => {
           await Region.remove({});
           await District.remove({});
            await server.close()
        })
    
    describe('GET /', () => {
        it("should return all districts", async () => {
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
            expect(res.body.some(g => g.name === "Asokore Mampong")).toBeTruthy();
        })
        
        it("should get district by region", async () => {
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
            
            
            let region = await Region.find({ name: "Ashanti" }).limit(1);
            let district = new District({
                name: "Asokore Mampong",
                capital: "Asokore Mampong",
                region: region[0]._id,
            });
        
            await district.save();
            const res = await request(server).get('/districts/Ashanti/region');
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(1);
                expect(res.body.some(g => g.name === "Asokore Mampong")).toBeTruthy();
        })

        it("should add new district(s)", async () => {
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
            
            const res = await request(server).post('/districts')
                   .send([
                    {
                        name: "Asokore Mampong",
                        capital: "Asokore Mampong",
                        region: "Ashanti"
                    }  
                ]);
            expect(res.status).toBe(200);
            expect(res.text).toBe("district(s) inserted successfully");
        })
        })
     })
