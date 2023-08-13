import { Account, Client, Databases } from 'appwrite';

export const PROJECT_ID = '64d7d75ad3d6fecd7a4f';
export const DATABASE_ID = '64d7d86580b966cdc9e9';
export const COLLECTION_ID_MESSAGES = '64d7d86f0bd7664760bd';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64d7d75ad3d6fecd7a4f');

export const account = new Account(client);
export const databases = new Databases(client);

export default client;