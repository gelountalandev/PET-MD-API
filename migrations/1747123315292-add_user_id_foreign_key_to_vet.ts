import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdForeignKeyToVet1747123315292 implements MigrationInterface {
    name = 'AddUserIdForeignKeyToVet1747123315292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vet" ADD CONSTRAINT "UQ_53dab2e3bcc63fa8cbc46914b2d" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "vet" ADD CONSTRAINT "FK_53dab2e3bcc63fa8cbc46914b2d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vet" DROP CONSTRAINT "FK_53dab2e3bcc63fa8cbc46914b2d"`);
        await queryRunner.query(`ALTER TABLE "vet" DROP CONSTRAINT "UQ_53dab2e3bcc63fa8cbc46914b2d"`);
    }

}
