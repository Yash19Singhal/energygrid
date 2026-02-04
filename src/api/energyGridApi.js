const axios = require("axios");
const crypto = require("crypto");

const BASE_URL = "http://localhost:3000";
const ENDPOINT = "/device/real/query";
const TOKEN = "interview_token_123";

async function fetchDeviceData(snList) {
  const timestamp = Date.now().toString();

  const signature = crypto
    .createHash("md5")
    .update(ENDPOINT + TOKEN + timestamp)
    .digest("hex");

  const response = await axios.post(
    BASE_URL + ENDPOINT,
    { sn_list: snList },
    {
      headers: {
        signature,
        timestamp,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
}

module.exports = fetchDeviceData;
