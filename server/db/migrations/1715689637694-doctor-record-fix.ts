import { MigrationInterface, QueryRunner } from "typeorm";

export class DoctorRecordFix1715689637694 implements MigrationInterface {
    name = 'DoctorRecordFix1715689637694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_c754b56015c29101e22917e7dea"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD "doctorId" integer`);
        await queryRunner.query(`ALTER TABLE "timetable" ADD CONSTRAINT "FK_fe09a9cd0d8064843ff7cbf9850" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "FK_fe09a9cd0d8064843ff7cbf9850"`);
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD "doctorId" integer`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_c754b56015c29101e22917e7dea" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
