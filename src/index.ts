
export * from './data-model/data-model.js';
export * from './data-access/data-access.js';

import { defineProperty, generateSchema, } from './data-model/data-model.js';
import { EntityDefinition } from './data-model/entity-definition/EntityDefinition.js';
import { Repository } from './data-access/repository/Repository.js';

// a sample entity
const UserEntity: EntityDefinition = {
  name: 'User',
  properties: [
    defineProperty({ name: 'id', type: 'number', unique: true, nullable: false }),
    defineProperty({ name: 'username', type: 'string', unique: false, nullable: false }),
    defineProperty({ name: 'email', type: 'string', unique: false, nullable: false }),
  ]
};

// Generate DDL and print to console
console.log('--- Generated DDL ---');
const schema = generateSchema([UserEntity]);
console.log(schema);

// Optional: Run sample DB operation (make sure `.env` is configured)
type User = {
  id?: number; // Optional for create operations
  username: string;
  email: string;
};

const userRepo = new Repository<User>(UserEntity);
async function testRepository() {

  await userRepo.create({
    username: 'gautam13', 
    email: 'gautam13@example.com'});

  // Example findAll
  const users = await userRepo.findAll();
  console.log('Users from DB:', users);
}

// Uncomment below to run DB operations
 testRepository().catch(console.error);



