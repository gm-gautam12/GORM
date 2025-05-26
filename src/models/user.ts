import { defineProperty } from '../data-model/data-model.js';
import { EntityDefinition } from '../data-model/data-model.js';

export const UserModel: EntityDefinition = {
  name: 'User',
  properties: [
    defineProperty({ name: 'id', type: 'number', unique: true, nullable: false }),
    defineProperty({ name: 'username', type: 'string', unique: false, nullable: false }),
    defineProperty({ name: 'email', type: 'string', unique: false, nullable: false }),
  ]
};
