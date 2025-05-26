import { EntityDefinition } from "../../data-model/entity-definition/EntityDefinition.js";


export class QueryBuilder {

    static insert(entity: EntityDefinition): string {
        const columns = entity.properties.map(prop => `\`${prop.name}\``).join(', ');
        const values = entity.properties.map(prop => `?`).join(', ');
        return `INSERT INTO \`${entity.name}\` (${columns}) VALUES (${values});`;
    }

    static findAll(entity: EntityDefinition): string {
        return `SELECT * FROM \`${entity.name}\`;`;
    }

    static deleteById(entity: EntityDefinition): string {
        return `DELETE FROM \`${entity.name}\` WHERE id = ?;`;
    }

    static updateById(entity: EntityDefinition): string {
        const updates = entity.properties.map(prop => `\`${prop.name}\` = ?`).join(', ');
        return `UPDATE \`${entity.name}\` SET ${updates} WHERE id = ?;`;
    }

    static findById(entity: EntityDefinition): string {
        return `SELECT * FROM \`${entity.name}\` WHERE id = ?;`;
    }
}


