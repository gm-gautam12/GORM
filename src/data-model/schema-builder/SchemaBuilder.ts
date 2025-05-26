import { EntityDefinition } from '../entity-definition/EntityDefinition.js';



export function generateSchema(entities: EntityDefinition[]): string {
    let schema = '';

    for(const entity of entities){
        schema += `CREATE TABLE \`${entity.name}\` (\n`;

        for(const prop of entity.properties){
           if (prop.name === "id") {
             schema += `  \`${prop.name}\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n`;
           } else {
             schema += `  \`${prop.name}\` ${mapType(prop.type)}${
               prop.nullable ? "" : " NOT NULL"
             }${prop.unique ? " UNIQUE" : ""},\n`;
           }
        }

        if(entity.relationships){
            for(const rel of entity.relationships){
                schema += ` --${rel.type} relationship to ${rel.targetEntity}\n`; 
            }
        }
        schema = schema.trim().replace(/,+$/, '');
        schema += '\n);\n\n';
    }

    return schema;
}


function mapType(type: string): String {
    switch(type){
        case 'string': return 'VARCHAR(255)';
        case 'number': return 'INT';
        case 'boolean': return 'BOOLEAN';
        case 'date': return 'DATETIME';
        default: return 'TEXT'; // Default case for unknown types
    }
}