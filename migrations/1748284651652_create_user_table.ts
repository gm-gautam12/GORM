import { db } from './../src/data-access/mysql-connection/MySQLConnection.js';
import { Migration } from './../src/migration/migration-definition.js';
        export const migration: Migration = {
          id: "1748284651652_create_user_table",
          description: "create_user_table",

          up: async () => {
            const [tableExists_User] = await db.query(
              `SHOW TABLES LIKE 'User'`
            );
            if (!Array.isArray(tableExists_User))
              throw new Error("Table validation failed for User");
            await db.query(
              `CREATE TABLE IF NOT EXISTS \`User\` (\`id\` INT NOT NULL UNIQUE  PRIMARY KEY AUTO_INCREMENT, \`username\` VARCHAR(255) NOT NULL, \`email\` VARCHAR(255) NOT NULL);`
            );
          },

          down: async () => {
            await db.query(`ALTER TABLE \`User\` DROP COLUMN \`id\`;`);
            await db.query(`ALTER TABLE \`User\` DROP COLUMN \`username\`;`);
            await db.query(`ALTER TABLE \`User\` DROP COLUMN \`email\`;`);
          },
        };