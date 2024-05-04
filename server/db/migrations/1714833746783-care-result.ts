import { MigrationInterface, QueryRunner } from "typeorm";

export class CareResult1714833746783 implements MigrationInterface {
    name = 'CareResult1714833746783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "care_result" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "file" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "careRecordId" integer, CONSTRAINT "REL_f6a7a57bb128c3dafef41c0892" UNIQUE ("careRecordId"), CONSTRAINT "PK_8a1f247ed3af039f921ae398079" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "care_result" ADD CONSTRAINT "FK_f6a7a57bb128c3dafef41c0892c" FOREIGN KEY ("careRecordId") REFERENCES "care_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "care_result" DROP CONSTRAINT "FK_f6a7a57bb128c3dafef41c0892c"`);
        await queryRunner.query(`DROP TABLE "care_result"`);
    }

}
