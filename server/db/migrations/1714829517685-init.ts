import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714829517685 implements MigrationInterface {
    name = 'Init1714829517685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'patient', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "birthday" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "careRecordsId" integer, CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "care" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "price" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "careRecordsId" integer, CONSTRAINT "UQ_58fdb00b2ccab04cc3a067710c7" UNIQUE ("name"), CONSTRAINT "PK_d309c0c9fc1cb5bd8f2d890e2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."care_record_status_enum" AS ENUM('planned', 'completed', 'canceled', 'ignored')`);
        await queryRunner.query(`CREATE TABLE "care_record" ("id" SERIAL NOT NULL, "dateOfRecord" TIMESTAMP NOT NULL, "status" "public"."care_record_status_enum" NOT NULL DEFAULT 'planned', "patientId" integer, "careId" integer NOT NULL, CONSTRAINT "PK_7f3d27a823438390b3738aeecf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'doctor', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "experience" integer NOT NULL, "birthday" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "specialityId" integer, "departmentId" integer, CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE ("email"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "speciality" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d6343d3917d06d8ef61ec9042ed" UNIQUE ("name"), CONSTRAINT "PK_cfdbcfa372a34f2d9c1d5180052" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_d449fe957c8d04cbde3bc106b59" FOREIGN KEY ("careRecordsId") REFERENCES "care_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "care" ADD CONSTRAINT "FK_90096e7528c7341546f161ee879" FOREIGN KEY ("careRecordsId") REFERENCES "care_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "care_record" ADD CONSTRAINT "FK_ab0b24a8c673994a77b45dcb7e5" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "care_record" ADD CONSTRAINT "FK_72a157a23ee51fe8924d5958259" FOREIGN KEY ("careId") REFERENCES "care"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "FK_481703e5094c9305b69f8d61b58" FOREIGN KEY ("specialityId") REFERENCES "speciality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "FK_7efd70d19bf6ee451fa2280297c" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "FK_7efd70d19bf6ee451fa2280297c"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "FK_481703e5094c9305b69f8d61b58"`);
        await queryRunner.query(`ALTER TABLE "care_record" DROP CONSTRAINT "FK_72a157a23ee51fe8924d5958259"`);
        await queryRunner.query(`ALTER TABLE "care_record" DROP CONSTRAINT "FK_ab0b24a8c673994a77b45dcb7e5"`);
        await queryRunner.query(`ALTER TABLE "care" DROP CONSTRAINT "FK_90096e7528c7341546f161ee879"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_d449fe957c8d04cbde3bc106b59"`);
        await queryRunner.query(`DROP TABLE "speciality"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "care_record"`);
        await queryRunner.query(`DROP TYPE "public"."care_record_status_enum"`);
        await queryRunner.query(`DROP TABLE "care"`);
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
