import { AES } from 'crypto-js';

const SALT_KEY = process.env.SALT_KEY;

export const encryptText = (str: string): string => {
  if (!SALT_KEY) throw new Error('Something went wrong: No Salt Key');
  const encryptedString = AES.encrypt(str, SALT_KEY).toString();
  return encryptedString;
};
