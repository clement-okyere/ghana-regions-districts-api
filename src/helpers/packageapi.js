require('dotenv').config();
const axios = require('axios');

class PackageApi {
  constructor() {
    this.baseUrl = process.env.BASE_URL;
  }

  // get all regions
  async getRegions() {
    try {
      const resp = await axios.get(`${this.baseUrl}/regions`);
      const { data } = resp;
      return data;
    } catch (err) {
      return 'An error occurred';
    }
  }

  // get all districts
  async getDistricts() {
    try {
      const resp = await axios.get(`${this.baseUrl}/districts`);
      const { data } = resp;
      return data;
    } catch (err) {
      return 'An error occurred';
    }
  }

  // get district by region name
  async getDistrictsByRegion(region) {
    try {
      const resp = await axios.get(`${this.baseUrl}/districts/${region}/region`);
      const { data } = resp;
      return data;
    } catch (err) {
      return 'An error occurred';
    }
  }
}

module.exports = new PackageApi();
