const express = require("express");
const request = require("supertest");
const app = require("../../app");

describe("Get Regions", () => {
  it("should fetch list of regions", async () => {
    const res = await request(app)
      .get("/regions")
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual("All regions here");
      });
  });
});
