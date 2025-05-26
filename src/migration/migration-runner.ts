import fs from 'fs';
import path from 'path';
import { db } from '../data-access/mysql-connection/MySQLConnection.js';
import { Migration } from './migration-definition.js';


async function ensureMigrationTable(): Promise<void> {
    await db.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id VARCHAR(255) PRIMARY KEY,
            description TEXT,
            executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
         )
    `);
}

async function getExecutedMigrations() : Promise<string[]> {
    const [rows] = await db.query('SELECT id FROM Migrations');
    return (rows as any[]).map(r => r.id);
}

export async function runMigrations() {

    await ensureMigrationTable();

    const executed = new Set(await getExecutedMigrations());

    const files = fs.readdirSync('./migrations').filter(f => f.endsWith('/ts'));
    const sorted = files.sort();

    for(const file of sorted) {
        const {migration}: {migration: Migration} = await import(`../migrations/${file}`);
        if(!executed.has(migration.id)){
            console.log(`Running migration :${migration.id}`);
            await migration.up();
            await db.query('INSERT INTO migrations (id, description) VALUES (?, ?)', [migration.id, migration.description]);
        }
    }
}