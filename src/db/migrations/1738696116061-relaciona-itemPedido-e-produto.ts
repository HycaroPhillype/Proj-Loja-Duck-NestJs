import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1738696116061 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1738696116061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "intens_pedidos" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "intens_pedidos" ADD CONSTRAINT "FK_049430a9665f48943a7871c29fe" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "intens_pedidos" DROP CONSTRAINT "FK_049430a9665f48943a7871c29fe"`);
        await queryRunner.query(`ALTER TABLE "intens_pedidos" DROP COLUMN "productId"`);
    }

}
