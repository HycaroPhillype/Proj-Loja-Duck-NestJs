import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1738242578380 implements MigrationInterface {
    name = 'CriaTabelas1738242578380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "endereco" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "endereco"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "usuario_id" character varying(100) NOT NULL`);
    }

}
