import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelatesOrderItem1738432007977 implements MigrationInterface {
  name = 'RelatesOrderItem1738432007977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "intens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_323f6c6a5e0112e44060c3d1828" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "intens_pedidos" ADD CONSTRAINT "FK_a1bb4a2e0e66d28a16204b3dd3a" FOREIGN KEY ("orderId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intens_pedidos" DROP CONSTRAINT "FK_a1bb4a2e0e66d28a16204b3dd3a"`,
    );
    await queryRunner.query(`DROP TABLE "intens_pedidos"`);
  }
}
