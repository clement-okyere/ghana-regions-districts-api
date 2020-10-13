require("dotenv").config();
const axios = require("axios");

class PackageApi {
  constructor() {
    this.baseUrl = process.env.BASE_URL;
  }

  //get all regions
  async getRegions() {
    try {
      let resp = await axios.get(`${this.baseUrl}/regions`);
      let data = resp.data;
      return data;
    } catch (err) {
      return "An error occurred";
    }
  }

  //get all districts
  async getDistricts() {
    try {
      let resp = await axios.get(`${this.baseUrl}/districts`);
      let data = resp.data;
      return data;
    } catch (err) {
      return "An error occurred";
    }
  }

  //get district by region name
  async getDistrictsByRegion(region) {
    try {
      let resp = await axios.get(`${this.baseUrl}/districts/${region}/region`);
      let data = resp.data;
      return data;
    } catch (err) {
      return "An error occurred";
    }
  }
}

module.exports = new PackageApi();
