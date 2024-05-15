import { MigrationInterface, QueryRunner } from "typeorm";

export class Appointment1715778409634 implements MigrationInterface {
    name = 'Appointment1715778409634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_ea38700cc1bc15b2a0da85671f9"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "doctorRecordId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_8322daee1a8a9f60e927ba9d15e"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_289accfb11bd7f40d36367cd72f"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ALTER COLUMN "patientId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ALTER COLUMN "timetableId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_ea38700cc1bc15b2a0da85671f9" FOREIGN KEY ("doctorRecordId") REFERENCES "doctor_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_8322daee1a8a9f60e927ba9d15e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_289accfb11bd7f40d36367cd72f" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_289accfb11bd7f40d36367cd72f"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_8322daee1a8a9f60e927ba9d15e"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_ea38700cc1bc15b2a0da85671f9"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ALTER COLUMN "timetableId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ALTER COLUMN "patientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_289accfb11bd7f40d36367cd72f" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_8322daee1a8a9f60e927ba9d15e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "doctorRecordId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_ea38700cc1bc15b2a0da85671f9" FOREIGN KEY ("doctorRecordId") REFERENCES "doctor_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
