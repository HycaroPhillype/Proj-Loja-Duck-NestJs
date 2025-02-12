import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1739389662086 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1739389662086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5"`);
    }

}
