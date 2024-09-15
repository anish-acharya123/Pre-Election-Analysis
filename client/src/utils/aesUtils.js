// Function to convert a string to an array of bytes (Uint8Array)
function stringToBytes(str) {
  const encoder = new TextEncoder(); // Converts text to bytes
  return encoder.encode(str);
}

// Function to convert a byte array (Uint8Array) to a hex string
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Function to manually apply PKCS#7 padding (consistent with Python)
function pad(dataBytes, blockSize = 16) {
  const padLength = blockSize - (dataBytes.length % blockSize);
  const paddedData = new Uint8Array(dataBytes.length + padLength);
  paddedData.set(dataBytes);
  paddedData.fill(padLength, dataBytes.length);
  return paddedData;
}

// Function to generate a random IV (initialization vector)
function generateIv() {
  const iv = crypto.getRandomValues(new Uint8Array(16)); // Generate random IV of 16 bytes
  return bytesToHex(iv);
}

// Function to create a key from the secret string (which is in hex format)
async function createKey(secretKeyHex) {
  const keyBytes = new Uint8Array(
    secretKeyHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

// Function to encrypt data using AES-CBC with PKCS#7 padding
async function encryptData(data, secretKeyHex, ivHex) {
  const iv = new Uint8Array(
    ivHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  const key = await createKey(secretKeyHex);
  const dataBytes = pad(stringToBytes(data)); // Apply PKCS#7 padding manually
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    dataBytes
  );
  return {
    iv: ivHex,
    encryptedData: bytesToHex(new Uint8Array(encrypted)), // Ensure the output is hex
  };
}

// Export the functions
export { encryptData, generateIv };
