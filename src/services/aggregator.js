
const fetchDeviceData = require("../api/energyGridApi");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function aggregateAllDevices(serialNumbers) {
  const BATCH_SIZE = 10;
  const results = [];

  for (let i = 0; i < serialNumbers.length; i += BATCH_SIZE) {
    const batch = serialNumbers.slice(i, i + BATCH_SIZE);
    let success = false;
    let attempts = 0;

    while (!success && attempts < 3) {
      try {
        attempts++;
        const data = await fetchDeviceData(batch);
        results.push(...data);
        success = true;
        console.log(` Batch ${i / BATCH_SIZE + 1} fetched`);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log("⏳ 429 Too Many Requests — retrying after 1s");
          await sleep(1000);
        } else {
          console.log(" Network / server error — retrying after 1s");
          await sleep(1000);
        }
      }
    }

    
    await sleep(1000);
  }

  return results;
}

module.exports = aggregateAllDevices;
