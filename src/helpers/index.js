var packageapi = require("./packageapi");

console.log("packageapi", packageapi);
var regions = packageapi.getDistrictsByRegion("aha").then((resp) => {
  console.log(resp);
});
//console.log(regions);
