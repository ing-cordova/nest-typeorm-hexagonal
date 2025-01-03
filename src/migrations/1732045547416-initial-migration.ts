import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1732045547416 implements MigrationInterface {
    name = 'InitialMigration1732045547416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iso2" character varying NOT NULL, "iso3" character varying NOT NULL, "phone_code" character varying NOT NULL, "region" character varying NOT NULL, "currency" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_2c5aa339240c0c3ae97fcc9dc4c" UNIQUE ("name"), CONSTRAINT "UQ_b49a3cfa4a8ab50b388f893cd4c" UNIQUE ("iso2"), CONSTRAINT "UQ_8df5b1a0131e8e155381547aa5b" UNIQUE ("iso3"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_f70648ef30041d66995a0394afc" UNIQUE ("name"), CONSTRAINT "PK_1f9c6d05869e094dee8fa7d392a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "state_code" character varying, "country_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "user_type_id" integer NOT NULL, "first_name" character varying NOT NULL, "second_name" character varying, "last_name" character varying NOT NULL, "second_last_name" character varying, "phone_number" character varying, "email" character varying NOT NULL, "email_verified_at" TIMESTAMP, "username" character varying NOT NULL, "country_id" integer NOT NULL, "state_id" integer NOT NULL, "address" character varying, "password" character varying NOT NULL, "is_temporal_password" boolean NOT NULL DEFAULT true, "accepted_terms" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE ("email"), CONSTRAINT "UQ_622345c51168e12eba4225a0217" UNIQUE ("username"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "can" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_user_type" ("id" SERIAL NOT NULL, "user_type_id" integer NOT NULL, "permission_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_f7b7bec8afd49f75f49085409af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state" ADD CONSTRAINT "FK_dd19065b0813dbffd8170ea6753" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_805bbcb8c5de193481f165bd684" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_b22e1945e7067d187bf47689eb6" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_ef81a12b3d9ead50fc569c86db6" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_user_type" ADD CONSTRAINT "FK_496d1885e49757b62a1b3e2961d" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_user_type" ADD CONSTRAINT "FK_5a4c9c254ebf5d50c327f42055c" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_user_type" DROP CONSTRAINT "FK_5a4c9c254ebf5d50c327f42055c"`);
        await queryRunner.query(`ALTER TABLE "permission_user_type" DROP CONSTRAINT "FK_496d1885e49757b62a1b3e2961d"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_ef81a12b3d9ead50fc569c86db6"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_b22e1945e7067d187bf47689eb6"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_805bbcb8c5de193481f165bd684"`);
        await queryRunner.query(`ALTER TABLE "state" DROP CONSTRAINT "FK_dd19065b0813dbffd8170ea6753"`);
        await queryRunner.query(`DROP TABLE "permission_user_type"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "user_type"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
