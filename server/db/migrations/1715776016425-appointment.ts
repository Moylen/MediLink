import { MigrationInterface, QueryRunner } from "typeorm";

export class Appointment1715776016425 implements MigrationInterface {
    name = 'Appointment1715776016425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "diagnosis" character varying NOT NULL, "anamnesis" character varying NOT NULL, "recommendations" character varying NOT NULL, "comment" character varying NOT NULL, "doctorRecordId" integer, CONSTRAINT "REL_ea38700cc1bc15b2a0da85671f" UNIQUE ("doctorRecordId"), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_ea38700cc1bc15b2a0da85671f9" FOREIGN KEY ("doctorRecordId") REFERENCES "doctor_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_ea38700cc1bc15b2a0da85671f9"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
