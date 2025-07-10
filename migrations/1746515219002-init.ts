import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746515219002 implements MigrationInterface {
    name = 'Init1746515219002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "pet_owner_id" integer NOT NULL, "vet_id" integer NOT NULL, "schedule_time" TIMESTAMP NOT NULL, "consultation_type" character varying NOT NULL, "status" character varying NOT NULL, "started_at" TIMESTAMP, "ended_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultation" ("id" SERIAL NOT NULL, "appointment_id" integer NOT NULL, "notes" character varying, "prescription" character varying, "duration" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_5203569fac28a4a626c42abe70b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "consultation_id" integer NOT NULL, "rating" character varying NOT NULL, "comment" character varying, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_record" ("id" SERIAL NOT NULL, "pet_id" integer NOT NULL, "vet_id" integer NOT NULL, "prescription" character varying, "notes" character varying, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_d96ede886356ac47ddcbb0bf3a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, "breed" character varying, "species" character varying, "birth_date" TIMESTAMP, "gender" character varying, "weight" character varying, "created_at" TIMESTAMP, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "user_type" "public"."user_user_type_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet_owner" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, "contact_number" integer NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "REL_c7c963cfdd360165b8bce9aeca" UNIQUE ("user_id"), CONSTRAINT "PK_5116a00f46dd9097ed6bd8dd6a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vet" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "clinic_name" character varying NOT NULL, "name" character varying NOT NULL, "clinic_location" character varying NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_98679c20fcaf20547fe9cacdf4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pet_owner" ADD CONSTRAINT "FK_c7c963cfdd360165b8bce9aeca7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet_owner" DROP CONSTRAINT "FK_c7c963cfdd360165b8bce9aeca7"`);
        await queryRunner.query(`DROP TABLE "vet"`);
        await queryRunner.query(`DROP TABLE "pet_owner"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "medical_record"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
        await queryRunner.query(`DROP TABLE "consultation"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
