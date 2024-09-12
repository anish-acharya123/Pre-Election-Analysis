// aesUtils.js

// Function to convert a string to an array of bytes (Uint8Array)
function stringToBytes(str) {
  const encoder = new TextEncoder(); // Converts text to bytes
  return encoder.encode(str);
}

// Function to convert a byte array (Uint8Array) to a hex string
function bytesToHex(bytes) {
  return Array.from(bytes) // Convert the byte array to an array of hex strings
    .map((byte) => byte.toString(16).padStart(2, "0")) // Convert each byte to a two-character hex string
    .join(""); // Join the array into a single hex string
}

// Function to generate a random IV (initialization vector)
function generateIv() {
  const iv = crypto.getRandomValues(new Uint8Array(16)); // Generate 16 random bytes
  return iv; // Return the random bytes as the IV
}

// Function to create a key from the secret string (simple version)
async function createKey(secretKey) {
  const keyBytes = stringToBytes(secretKey); // Convert the secret key string to bytes
  return crypto.subtle.importKey(
    "raw", // Key format (raw means the key is in plain bytes)
    keyBytes, // The key bytes
    { name: "AES-CBC" }, // The algorithm we're going to use
    false, // This key can't be exported
    ["encrypt", "decrypt"] // This key will be used for both encryption and decryption
  );
}

// Function to encrypt some data using AES
async function encryptData(data, secretKey, iv) {
  const key = await createKey(secretKey); // Create the encryption key
  const ivBytes = iv; // The IV should be in byte array format
  const dataBytes = stringToBytes(data); // Convert the data to bytes
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBytes }, // The AES-CBC algorithm with the IV
    key, // The key we created
    dataBytes // The data to encrypt (as bytes)
  );
  return {
    iv: bytesToHex(iv), // Convert the IV to a hex string
    encryptedData: bytesToHex(new Uint8Array(encrypted)), // Convert the encrypted bytes to a hex string
  };
}

// Function to decrypt the encrypted data (optional, for testing)
async function decryptData(encryptedHex, secretKey, ivHex) {
  const key = await createKey(secretKey); // Create the decryption key
  const ivBytes = new Uint8Array(
    ivHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)) // Convert the hex string back to bytes
  );
  const encryptedBytes = new Uint8Array(
    encryptedHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)) // Convert the hex string back to bytes
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes }, // The AES-CBC algorithm with the IV
    key, // The key we created
    encryptedBytes // The encrypted data (as bytes)
  );
  return new TextDecoder().decode(decrypted); // Convert the decrypted bytes back to a string
}

// Exporting the functions so they can be used in other files
export { encryptData, decryptData, generateIv };
