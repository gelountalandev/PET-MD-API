import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConsultationIdForeignKeyToFeedback1747882009275 implements MigrationInterface {
    name = 'AddConsultationIdForeignKeyToFeedback1747882009275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "UQ_8f9a1e5caace428bec74f9ac229" UNIQUE ("consultation_id")`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_8f9a1e5caace428bec74f9ac229" FOREIGN KEY ("consultation_id") REFERENCES "consultation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_8f9a1e5caace428bec74f9ac229"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "UQ_8f9a1e5caace428bec74f9ac229"`);
    }

}
