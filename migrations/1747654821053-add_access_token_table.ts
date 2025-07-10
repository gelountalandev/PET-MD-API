import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccessTokenTable1747654821053 implements MigrationInterface {
    name = 'AddAccessTokenTable1747654821053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "access_token" ("token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_70ba8f6af34bc924fc9e12adb8f" PRIMARY KEY ("token"))`);
        await queryRunner.query(`ALTER TABLE "access_token" ADD CONSTRAINT "FK_4bd9bc00776919370526766eb43" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_token" DROP CONSTRAINT "FK_4bd9bc00776919370526766eb43"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
    }

}
