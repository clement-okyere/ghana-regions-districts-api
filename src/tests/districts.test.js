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
            console.log("response from region by district search", res.text);
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(1);
                expect(res.body.some(g => g.name === "Asokore Mampong")).toBeTruthy();
        })
        })

    // describe('GET /:region/region', () => {
    //          Region.collection.insertMany([
    //         {
    //             name: "Ashanti",
    //             capital: "Kumasi"
    //         },
    //         {
    //             name: "Bono",
    //             capital: "Techiman"
    //         }
    //          ]);
        
    //     it("should district by region", async () => {
    //     let region = await Region.find({ name: "Ashanti" }).limit(1);
    //         let district = new District({
    //             name: "Asokore Mampong",
    //             capital: "Asokore Mampong",
    //             region: region._id,
    //         });
        
    //         district.save()
    //             const res = await request(server).get('districts/Ashanti/region');
    //             expect(res.status).toBe(200);
    //             expect(res.body.length).toBe(1);
    //             expect(res.body.some(g => g.name === "Asokore Mampong")).toBeTruthy();
    //     })
    //     })
     })
