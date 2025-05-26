import { EntityDefinition } from '../../data-model/entity-definition/EntityDefinition.js';


export class DataMapper {
    static toEntity<T>(row: any, entityDef: EntityDefinition): T {
        const obj : any = {};
        for(const prop of entityDef.properties){
            obj[prop.name] = row[prop.name];
        }

        return obj as T;
    }

    static toRow<T>(entity: T, entityDef: EntityDefinition): any {
        const row: any = {};
        for(const prop of entityDef.properties) {
            row[prop.name] = (entity as any)[prop.name];
        }

        return row;
    }
}