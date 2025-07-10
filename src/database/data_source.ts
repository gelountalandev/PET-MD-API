import { DataSource, DataSourceOptions } from 'typeorm';
import { AppointmentModel } from '../models/appointment.model';
import { ConsultationModel } from '../models/consultation.model';
import { FeedbackModel } from '../models/feedback.model';
import { MedicalRecordModel } from '../models/medical_record.model';
import { PetModel } from '../models/pet.model';
import { PetOwnerModel } from '../models/pet_owner.model';
import { UserModel } from '../models/user.model';
import { VetModel } from '../models/vet.model';
import { AccessTokenModel } from '../models/access_token.model';
import { DATABASE_CONFIG } from '../app.constants';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DATABASE_CONFIG.HOST,
  port: DATABASE_CONFIG.PORT,
  username: DATABASE_CONFIG.USERNAME,
  password: DATABASE_CONFIG.PASSWORD,
  database: DATABASE_CONFIG.DATABASE_NAME,

  entities: [
    AppointmentModel,
    ConsultationModel,
    FeedbackModel,
    MedicalRecordModel,
    PetModel,
    PetOwnerModel,
    UserModel,
    VetModel,
    AccessTokenModel,
  ],
};

const dataSource = new DataSource({ ...dataSourceOptions, migrations: ['./migrations/*.ts'] });
export default dataSource;