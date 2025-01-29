import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1738180397854 implements MigrationInterface {
    name = 'CriaTabelas1738180397854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_eb1531605709dd94ec67b2141d0"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" RENAME COLUMN "produtoId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" RENAME COLUMN "produtoId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidade_disponivel"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_5b2185e272966bc5a65ee283c4d" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_ab7aee654f86d757eeeb2f8e422" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_ab7aee654f86d757eeeb2f8e422"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_5b2185e272966bc5a65ee283c4d"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "quantidade_disponivel" TO "quantidade"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" RENAME COLUMN "productId" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" RENAME COLUMN "productId" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
