import { MigrationInterface, QueryRunner } from "typeorm";

export class Timetable1716994723129 implements MigrationInterface {
    name = 'Timetable1716994723129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" ADD "isFree" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "timetable" DROP COLUMN "isFree"`);
    }

}
