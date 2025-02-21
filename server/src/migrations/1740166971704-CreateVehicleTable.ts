import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicleTable1740166971704 implements MigrationInterface {
    name = 'CreateVehicleTable1740166971704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "licensePlate" character varying NOT NULL, "manufacturer" character varying NOT NULL, "model" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
