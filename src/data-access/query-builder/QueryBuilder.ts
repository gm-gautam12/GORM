import { EntityDefinition } from "../../data-model/entity-definition/EntityDefinition.js";


export class QueryBuilder {

    static insert(entityDef: EntityDefinition): string {
    const columns = entityDef.properties.map(p => `\`${p.name}\``).join(', ');
    const placeholders = entityDef.properties.map(() => `?`).join(', ');
    return `INSERT INTO \`${entityDef.name}\` (${columns}) VALUES (${placeholders});`;
    }


    static findAll(entity: EntityDefinition): string {
        return `SELECT * FROM \`${entity.name}\`;`;
    }

    static deleteById(entity: EntityDefinition): string {
        return `DELETE FROM \`${entity.name}\` WHERE id = ?;`;
    }

    static updateById(entity: EntityDefinition): string {
    const updates = entity.properties
        .filter(prop => prop.name !== 'id') // ✅ skip primary key
        .map(prop => `\`${prop.name}\` = ?`)
        .join(', ');
    
    return `UPDATE \`${entity.name}\` SET ${updates} WHERE id = ?;`;
    }


    static findById(entity: EntityDefinition): string {
        return `SELECT * FROM \`${entity.name}\` WHERE id = ?;`;
    }
}


