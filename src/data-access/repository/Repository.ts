import { db } from '../mysql-connection/MySQLConnection.js';
import { QueryBuilder } from '../query-builder/QueryBuilder.js';
import { DataMapper } from '../data-mapper/DataMapper.js';
import { EntityDefinition } from '../../data-model/entity-definition/EntityDefinition.js';


export class Repository<T> {

    constructor(private entityDef: EntityDefinition) {}

    async create(entity: T): Promise<void> {
  ///// Filter out 'id' (or any AUTO_INCREMENT field)
  const insertableProps = this.entityDef.properties.filter(p => p.name !== 'id');
  
  ///// Build query only with insertable properties
  const query = QueryBuilder.insert({
    ...this.entityDef,
    properties: insertableProps,
  });

  const values = insertableProps.map(p => (entity as any)[p.name]);
  await db.query(query, values);
}


    async findAll() : Promise<T[]> {
        const [rows] = await db.query(QueryBuilder.findAll(this.entityDef));
        return (rows as any[]).map(row => DataMapper.toEntity<T>(row,this.entityDef));
    }

    async deleteById(id: number): Promise<void> {
        await db.query(QueryBuilder.deleteById(this.entityDef),[id]);
    }

    async updateById(id: number, entity: T): Promise<void> {
        let row = DataMapper.toRow(entity, this.entityDef);
        delete row['id'];
        const values = Object.values(row);
        values.push(id);
        await db.query(QueryBuilder.updateById(this.entityDef), values);
    }

    async findById(id: number): Promise<T | null> {
        const [rows] = await db.query(QueryBuilder.findById(this.entityDef), [id]);
        if (!Array.isArray(rows) || rows.length === 0) {
        return null;
        }
        return DataMapper.toEntity<T>(rows[0], this.entityDef);
    }
}