import { db } from './../src/data-access/mysql-connection/MySQLConnection.js';
import { Migration } from './../src/migration/migration-definition.js';

export const migration: Migration = {
  id: '1748283628099_create_user_table',
  description: 'create_user_table',

  up: async () => {
    await db.query(
      `CREATE TABLE IF NOT EXISTS \`User\` (
        \`id\` INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
        \`username\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL
      );`
    );
  },

  down: async () => {
    await db.query(`DROP TABLE IF EXISTS \`User\`;`);
  },
};
