import { type WebCredential } from '@prisma/client';
import { faker } from '@faker-js/faker';

import AES from 'crypto-js/aes';

export type WebCredentialType = Omit<
  WebCredential,
  'id' | 'createdAt' | 'updatedAt'
>;

export const generateWebCredentials = (): WebCredentialType[] => {
  const webCredentials: WebCredentialType[] = [];
  const SALT_KEY = 'hubert';

  for (let i = 0; i < 100; i++) {
    const hashedUserEmail = AES.encrypt(
      faker.internet.email(),
      SALT_KEY,
    ).toString();
    const hashedPassword = AES.encrypt(
      faker.internet.password(),
      SALT_KEY,
    ).toString();
    const credential: WebCredentialType = {
      title: faker.company.catchPhrase(),
      user_email: hashedUserEmail,
      site_url: faker.internet.url(),
      password: hashedPassword,
      userId: 1,
    };

    webCredentials.push(credential);
  }
  return webCredentials;
};
