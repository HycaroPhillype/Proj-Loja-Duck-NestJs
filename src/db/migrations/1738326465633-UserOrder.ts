import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserOrder1738326465633 implements MigrationInterface {
  name = 'UserOrder1738326465633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_eace73d764c798d99fd8cb2d59d" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_eace73d764c798d99fd8cb2d59d"`,
    );
    await queryRunner.query(`DROP TABLE "pedidos"`);
  }
}
