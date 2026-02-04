function generateSerialNumbers(count = 500) {
  const serials = [];

  for (let i = 0; i < count; i++) {
    const padded = String(i).padStart(3, "0");
    serials.push(`SN-${padded}`);
  }

  return serials;
}

module.exports = generateSerialNumbers;
