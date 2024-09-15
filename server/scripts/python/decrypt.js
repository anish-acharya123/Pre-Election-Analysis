// decrypt.js
const crypto = require("crypto").webcrypto;

// Create the key from the secretKey string
async function createKey(secretKey) {
  const enc = new TextEncoder().encode(secretKey);
  return crypto.subtle.importKey("raw", enc, { name: "AES-CBC" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

// Decrypt function
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

// Read input from command line arguments (encryptedHex, secretKey, ivHex)
const args = process.argv.slice(2);
const encryptedHex = args[0];
const secretKey = args[1];
const ivHex = args[2];

// Call the decrypt function and print the result
decryptData(encryptedHex, secretKey, ivHex)
  .then((decrypted) => {
    console.log(decrypted);
  })
  .catch((err) => {
    console.error("Decryption failed:", err.message);
  });
