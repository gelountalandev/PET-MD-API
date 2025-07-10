import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAppointmentIdForeignKeyToConsultation1747714290271 implements MigrationInterface {
    name = 'AddAppointmentIdForeignKeyToConsultation1747714290271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultation" ADD CONSTRAINT "UQ_0aa1d27dba50dc2b9781bf2252e" UNIQUE ("appointment_id")`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_946483bd7690ee400f484637c8a" FOREIGN KEY ("pet_owner_id") REFERENCES "pet_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_06bd8e487748abdc1b547ab784c" FOREIGN KEY ("vet_id") REFERENCES "vet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultation" ADD CONSTRAINT "FK_0aa1d27dba50dc2b9781bf2252e" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultation" DROP CONSTRAINT "FK_0aa1d27dba50dc2b9781bf2252e"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_06bd8e487748abdc1b547ab784c"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_946483bd7690ee400f484637c8a"`);
        await queryRunner.query(`ALTER TABLE "consultation" DROP CONSTRAINT "UQ_0aa1d27dba50dc2b9781bf2252e"`);
    }

}
