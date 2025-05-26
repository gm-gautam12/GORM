# GORM - Custom ORM based on Typescript

An ORM, or Object-Relational Mapper, is a software layer that simplifies interactions between object-oriented programming languages and relational databases. It provides a way to map database tables to objects within the programming language, allowing developers to work with data using familiar object-oriented structures instead of writing raw SQL queries


## ⚙️ Features

- Define entities using `defineEntity`, `defineProperty`
- Automatically generate SQL schema from entity models
- Create and run migrations
- Perform CRUD operations using a `Repository` pattern

  
## 📁 Project Structure

## 🚀 Getting Started

### Prerequisites

- Node.js
- MySQL database running locally or remotely

### 1. Clone and install

```bash
git clone https://github.com/yourusername/ts-custom-orm.git
cd ts-custom-orm
npm install

Configure your database
Update your DB connection in src/data-access/database.ts:

createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_db_name',
});

Define a Model
Create a model like models/user.ts:

import { defineEntity, defineProperty } from '../src/data-model/data-model.js';

export const UserModel = defineEntity('User', [
  defineProperty('id', 'number', { primaryKey: true, autoIncrement: true }),
  defineProperty('username', 'string'),
  defineProperty('email', 'string'),
]);

Run the ORM using - npx tsx watch src/index.ts

Generate a Migration - npm run orm generate ./models/user.ts create_user_table

Run Migration - npm run orm migrate

# data-model/migration

This component provides a comprehensive solution for managing database migrations in your ORM. It includes modules for defining migration structures, generating migration files, and running migrations in a controlled manner.

## Modules

### 1. Migration Definition

The `Migration Definition` module establishes a standard structure for migration files to ensure consistency and clarity.

*   **Unique Identifier:** Each migration file has a unique identifier, typically a timestamp (e.g., `20240725103000`).
*   **Description:** Includes a brief description of the changes being made by the migration (e.g., `add_email_column_to_users_table`).
*   **Up Function:** Defines the changes to be applied to the database schema.
*   **Down Function:** Defines the changes to be reverted when rolling back the migration.

### 2. Migration Generator

The `Migration Generator` module automates the process of creating migration files by comparing the current data model with the existing database schema.

*   **Schema Comparison:** Compares the current data model with the existing database schema.
*   **Change Detection:** Identifies the differences between the data model and the database schema.
*   **Migration File Generation:** Generates a new migration file containing the necessary `up` and `down` functions to apply the changes.

### 3. Migration Runner

The `Migration Runner` module executes the migration files in the correct order and keeps track of which migrations have been applied.

*   **Migration Discovery:** Reads migration files from a designated directory (e.g., `migrations`).
*   **Migration Tracking:** Creates a dedicated table in the database (e.g., `migrations`) to store the list of applied migrations.
*   **Migration Execution:** Applies the migrations in sequence, based on their unique identifier.
*   **Rollback Support:** Provides the ability to rollback migrations by executing the `down` function for the specified migration.

## Dependencies

*   `data-model/entity-definition`
*   `data-model/property-definition`
*   `data-model/relationship-definition`

## Usage

1.  Define your data model using the `entity-definition`, `property-definition`, and `relationship-definition` components.
2.  Use the `Migration Generator` to compare your data model with the existing database schema and generate migration files.
3.  Use the `Migration Runner` to execute the migration files and update your database schema.
4.  Track applied migrations in the dedicated `migrations` table.
