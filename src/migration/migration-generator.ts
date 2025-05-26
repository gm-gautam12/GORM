import { EntityDefinition } from '../data-model/entity-definition/EntityDefinition.js';
import { db } from '../data-access/mysql-connection/MySQLConnection.js';
import fs from 'fs';
import path from 'path';


/// This function builds a SQL CREATE TABLE statement based on the entity definition.


function buildCreateTableSQL(entity: EntityDefinition) : string {
    const columns = entity.properties.map( p => {
        const typeMap : Record<string, string> = {
            number: 'INT',
            string: 'VARCHAR(255)',
            boolean: 'BOOLEAN',
        };

        const sqlType = typeMap[p.type] || 'TEXT';
        const constraints = [
            p.nullable === false ? 'NOT NULL' : '',
            p.unique ? 'UNIQUE' : '',
            p.name === 'id' ? ' PRIMARY KEY AUTO_INCREMENT': '',
        ].filter(Boolean).join(' ');
        return `\`${p.name}\` ${sqlType} ${constraints}`.trim();
    });

    return `CREATE TABLE IF NOT EXISTS \`${entity.name}\` (${columns.join(', ')});`;
}

function buildDropColumnSQL(entity: EntityDefinition) : string[] {
    return entity.properties.map(p => `ALTER TABLE \`${entity.name}\` DROP COLUMN \`${p.name}\`;`);
}

function buildValidationQuery(entity: EntityDefinition): string {
  return `SHOW TABLES LIKE '${entity.name}'`;
}



/// it will generate a migration file with the name migrationName convention based on date+timestamp
/// this function will call the above on passing entity as parameter

export async function generateMigration (entityDefs: EntityDefinition[],migrationName: string) {
    const timeStamp = Date.now();
    const id = `${timeStamp}_${migrationName}`;
    const migrationsDir = path.join('migrations');
    if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    }

    //file name
    const filename = path.join(migrationsDir, `${id}.ts`);

    const ddlStatement : string[] = entityDefs.map(e => buildCreateTableSQL(e));
    const rollbackStatement : string[] = entityDefs.flatMap(e => buildDropColumnSQL(e));
    const validationStatement: string[] = entityDefs.map(e => `const [tableExists_${e.name}] = await db.query(\`${buildValidationQuery(e)}\`); if (!Array.isArray(tableExists_${e.name})) throw new Error('Table validation failed for ${e.name}');`);

    const migrationContent = `
        import { db } from '../data-access/mysql-connection/MySQLConnection.js';
        import { Migration } from './MigrationDefinition.js';

        export const migration : Migration = {
            id: '${id}',
            description: '${migrationName}',

            up: async() => {
             ${validationStatement.join('\n    ')},
             ${ddlStatement
               .map((q) => `await db.query(\`${q.replace(/`/g, "\\`")}\`);`)
               .join("\n    ")}

            },

            down: async () => {
                ${rollbackStatement.map(q => `await db.query(\`${q.replace(/`/g, '\\`')}\`);`).join('\n    ')}
            }

        };
    `;

    fs.writeFileSync(filename, migrationContent.trim());
    console.log(`Migration file created: ${filename}`);
};
