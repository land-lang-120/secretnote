/* SecretNote — Crypto helpers (WebCrypto: PBKDF2 + AES-GCM)
 *
 * - PBKDF2 (SHA-256, 100k iterations) pour hasher le PIN avec un sel.
 * - AES-GCM 256 (clé dérivée du PIN) prêt à l'emploi pour chiffrement E2E.
 * - Le PIN en clair n'est jamais persisté.
 */

var SN_PBKDF2_ITERATIONS = 100000;
var SN_SALT_BYTES = 16;
var SN_AES_IV_BYTES = 12;

function snBytesToBase64(bytes) {
  var s = "";
  for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function snBase64ToBytes(b64) {
  var raw = atob(b64);
  var out = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function snRandomBytes(n) {
  var arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return arr;
}

/* Hash PBKDF2 du PIN. Si saltB64 omis, génère un sel frais (16 bytes).
 * Renvoie { hashB64, saltB64 }. */
async function snHashPin(pin, saltB64) {
  var enc = new TextEncoder();
  var salt = saltB64 ? snBase64ToBytes(saltB64) : snRandomBytes(SN_SALT_BYTES);
  var keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(pin), { name: "PBKDF2" }, false, ["deriveBits"]
  );
  var bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt, iterations: SN_PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial, 256
  );
  return {
    hashB64: snBytesToBase64(new Uint8Array(bits)),
    saltB64: snBytesToBase64(salt),
  };
}

/* Comparaison constant-time pour éviter les timing attacks. */
function snConstantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* Dérive une clé AES-GCM 256 bits depuis PIN + sel — pour chiffrement E2E. */
async function snDeriveAesKey(pin, saltB64) {
  var enc = new TextEncoder();
  var salt = snBase64ToBytes(saltB64);
  var km = await crypto.subtle.importKey(
    "raw", enc.encode(pin), { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt, iterations: SN_PBKDF2_ITERATIONS, hash: "SHA-256" },
    km,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function snAesEncrypt(plain, pin, saltB64) {
  var enc = new TextEncoder();
  var key = await snDeriveAesKey(pin, saltB64);
  var iv = snRandomBytes(SN_AES_IV_BYTES);
  var ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(plain))
  );
  var packet = new Uint8Array(iv.length + ct.length);
  packet.set(iv, 0);
  packet.set(ct, iv.length);
  return snBytesToBase64(packet);
}

async function snAesDecrypt(packetB64, pin, saltB64) {
  var dec = new TextDecoder();
  var packet = snBase64ToBytes(packetB64);
  var iv = packet.slice(0, SN_AES_IV_BYTES);
  var ct = packet.slice(SN_AES_IV_BYTES);
  var key = await snDeriveAesKey(pin, saltB64);
  var pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ct);
  return dec.decode(pt);
}
