"use client"

export function encryptData(data) {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?/.>';\`~0987654321";
    let encryptedData = "";
    let toAdd = 1;

    for (let i = 0; i < data.length; i++) {
        encryptedData += data[i];

        for (let j = 0; j < toAdd; j++) {
            const rand = letters[Math.floor(Math.random() * letters.length)];
            encryptedData += rand;
        }

        if (toAdd < 5) toAdd++;
    }

    encryptedData += '|' + data.length;

    return encryptedData;
}

export function decryptData(encrypted) {
    const parts = encrypted.split('|');
    const dataEncrypted = parts[0];
    const originalLength = parseInt(parts[1], 10);

    let decryptedData = "";
    let index = 0;
    let toAdd = 1;

    for (let i = 0; i < originalLength; i++) {
        decryptedData += dataEncrypted[index];
        index += toAdd + 1; 
        if (toAdd < 5) toAdd++;
    }

    console.log("Descripted Value: ", decryptedData, encrypted)

    return decryptedData;
}

