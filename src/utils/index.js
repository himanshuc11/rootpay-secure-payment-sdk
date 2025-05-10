const toHex = (arr) => Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
export async function generateSecureToken(clientSecret) {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const key = new TextEncoder().encode(clientSecret.slice(0, 32));
    const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt']);
    const encodedTimestamp = new TextEncoder().encode(Date.now().toString());
    const encrypted = await crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv
    }, cryptoKey, encodedTimestamp);
    const encryptedArray = new Uint8Array(encrypted);
    const authTag = encryptedArray.slice(-16);
    const encryptedContent = encryptedArray.slice(0, -16);
    return {
        token: `${toHex(encryptedContent)}.${toHex(authTag)}`,
        iv: toHex(iv)
    };
}
