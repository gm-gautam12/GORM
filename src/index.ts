
export * from './data-model/data-model.js';
export * from './data-access/data-access.js';

import { defineProperty, generateSchema, } from './data-model/data-model.js';
import { EntityDefinition } from './data-model/entity-definition/EntityDefinition.js';
import { Repository } from './data-access/repository/Repository.js';
import { UserModel } from './models/user.js';


console.log('--- Generated DDL ---');
const schema = generateSchema([UserModel]);
console.log(schema);



type User = {
  id?: number;
  username: string;
  email: string;
};

const userRepo = new Repository<User>(UserModel);
async function testRepository() {

    // await userRepo.create({
    // username: 'gautam13m', 
    // email: 'gautam13m@example.com'});

  // Example findAll
   const users = await userRepo.updateById(15,{
    username: 'gautam45',
    email: 'mishra@example.com',
   });
   console.log('DB data:', users);
}

// Uncomment below to run DB operations
 testRepository().catch(console.error);