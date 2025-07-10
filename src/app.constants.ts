import * as dotenv from 'dotenv'

dotenv.config();

export const DATABASE_CONFIG = {
    HOST: process.env.DB_HOST,
    PORT: +process.env.DB_PORT!,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE_NAME: process.env.DB_NAME,
}

export enum USER_TYPE {
  VET = 'VET',
  PET_OWNER = 'PET_OWNER',
}

export enum CONSULTATION_TYPE {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum APPOINTMENT_STATUS {
  VIDEO = 'VIDEO',
  CHAT = 'CHAT',
  VOICE = 'VOICE',
}
