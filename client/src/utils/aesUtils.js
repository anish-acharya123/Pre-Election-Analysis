// aesUtils.js

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
  return crypto.getRandomValues(new Uint8Array(16)); // Generate random IV of 16 bytes
}

// Function to create a key from the secret string
async function createKey(secretKey) {
  const keyBytes = stringToBytes(secretKey);
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

// Function to encrypt data using AES-CBC with PKCS#7 padding
async function encryptData(data, secretKey, iv) {
  const key = await createKey(secretKey);
  const dataBytes = pad(stringToBytes(data)); // Apply PKCS#7 padding manually
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    dataBytes
  );
  return {
    iv: bytesToHex(iv),
    encryptedData: bytesToHex(new Uint8Array(encrypted)),
  };
}

// Function to decrypt the encrypted data (for testing)
async function decryptData(encryptedHex, secretKey, ivHex) {
  const key = await createKey(secretKey);
  const ivBytes = new Uint8Array(
    ivHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  const encryptedBytes = new Uint8Array(
    encryptedHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    key,
    encryptedBytes
  );
  return new TextDecoder().decode(decrypted);
}

// Export the functions
export { encryptData, decryptData, generateIv };
// s;
