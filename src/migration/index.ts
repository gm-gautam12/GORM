import {runMigrations} from './migration-runner.js';

runMigrations().catch(console.error);


import {generateMigration} from './migration-generator.js';
import {EntityDefinition} from '../data-model/entity-definition/EntityDefinition.js';
import { defineProperty } from '../data-model/data-model.js';


const UserEntity: EntityDefinition = {
    name: 'User',
    properties: [
        defineProperty({ name: 'id', type: 'number', unique: true, nullable: false }),
        defineProperty({ name: 'username', type: 'string', unique: false, nullable: false }),
        defineProperty({ name: 'email', type: 'string', unique: false, nullable: false }),
    ]
};


await generateMigration([UserEntity], 'create_user_table');