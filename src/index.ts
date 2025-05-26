
export * from './data-model/data-model.js';
export * from './data-access/data-access.js';

import { defineProperty, generateSchema, } from './data-model/data-model.js';
import { EntityDefinition } from './data-model/entity-definition/EntityDefinition.js';
import { Repository } from './data-access/repository/Repository.js';
import {generateMigration} from './migration/migration-generator.js';


// a sample entity
const UserEntity: EntityDefinition = {
  name: 'User',
  properties: [
    defineProperty({ name: 'id', type: 'number', unique: true, nullable: false }),
    defineProperty({ name: 'username', type: 'string', unique: false, nullable: false }),
    defineProperty({ name: 'email', type: 'string', unique: false, nullable: false }),
  ]
};



console.log('--- Generated DDL ---');
const schema = generateSchema([UserEntity]);
console.log(schema);



type User = {
  id?: number;
  username: string;
  email: string;
};

const userRepo = new Repository<User>(UserEntity);
async function testRepository() {

//   await userRepo.create({
//     username: 'gautam13', 
//     email: 'gautam13@example.com'});

  // Example findAll
  const users = await userRepo.findById(1);
  console.log('Users from DB:', users);
}

// Uncomment below to run DB operations
 //testRepository().catch(console.error);


import {runMigrations} from './migration/migration-runner.js';

runMigrations().catch(console.error);





await generateMigration([UserEntity], 'create_user_table');
