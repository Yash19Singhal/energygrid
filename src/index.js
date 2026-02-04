const generateSerialNumbers = require("./utils/serialGenerator");
const aggregateAllDevices = require("./services/aggregator");

(async function main() {
  console.log("⚡ Starting EnergyGrid Data Aggregator...");

  const serialNumbers = generateSerialNumbers();
  const startTime = Date.now();

  const data = await aggregateAllDevices(serialNumbers);

  const endTime = Date.now();

  console.log("✅ Aggregation Complete");
  console.log(`Total Devices Fetched: ${data.length}`);
  console.log(`Time Taken: ${(endTime - startTime) / 1000}s`);
})();
