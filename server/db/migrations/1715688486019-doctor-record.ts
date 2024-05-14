import { MigrationInterface, QueryRunner } from "typeorm";

export class DoctorRecord1715688486019 implements MigrationInterface {
    name = 'DoctorRecord1715688486019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "timetable" ("id" SERIAL NOT NULL, "time" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_06001d91b3fe346fb1387ad1a15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_record_status_enum" AS ENUM('planned', 'completed', 'canceled', 'ignored')`);
        await queryRunner.query(`CREATE TABLE "doctor_record" ("id" SERIAL NOT NULL, "status" "public"."doctor_record_status_enum" NOT NULL DEFAULT 'planned', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "patientId" integer, "doctorId" integer, "timetableId" integer, CONSTRAINT "PK_68a23a38bedc6836d3755024a5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_8322daee1a8a9f60e927ba9d15e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_c754b56015c29101e22917e7dea" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_record" ADD CONSTRAINT "FK_289accfb11bd7f40d36367cd72f" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_289accfb11bd7f40d36367cd72f"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_c754b56015c29101e22917e7dea"`);
        await queryRunner.query(`ALTER TABLE "doctor_record" DROP CONSTRAINT "FK_8322daee1a8a9f60e927ba9d15e"`);
        await queryRunner.query(`DROP TABLE "doctor_record"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_record_status_enum"`);
        await queryRunner.query(`DROP TABLE "timetable"`);
    }

}
