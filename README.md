<h1 align="center" id="title">GORM - custom ORM</h1>

<p align="center"><img src="https://miro.medium.com/v2/resize:fit:414/format:webp/1*wSBJOgnE198q6iQoG9lbaA.jpeg" alt="project-image"></p>

<p id="description">An ORM or Object-Relational Mapper is a software layer that simplifies interactions between object-oriented programming languages and relational databases. It provides a way to map database tables to objects within the programming language allowing developers to work with data using familiar object-oriented structures instead of writing raw SQL queries</p>

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Define entities using defineEntity defineProperty
*   Automatically generate SQL schema from entity models
*   Create and run migrations
*   Perform CRUD operations using a Repository pattern

<h2>📁 Project Architecture </h2>
 
<b>Data Model </b> - 	Defines entities, properties, and relationships for the system. </br>
<b>Data Access </b>-	Implements the Repository pattern to abstract database interactions.</br>
<b>Migration System </b>- Manages schema migrations by generating and applying changes from the models.</br>
<b>CLI Tool </b> - Provides a command-line interface for running migrations and generating files.


<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/yourusername/ts-custom-orm.git
```

<p>2. Install Dependencies</p>

```
npm install
```

<p>3. Configure Your Database</p>

```
import { createPool } from 'mysql2/promise';

export const db = createPool({
  host: 'localhost',     // or your remote host
  user: 'root',          // your MySQL username
  password: '',          // your MySQL password
  database: 'your_db_name',
});

```

<p>4. Define Your Models</p>

```
import { defineEntity, defineProperty } from '../src/data-model/data-model.js';

export const UserModel = defineEntity('User', [
  defineProperty('id', 'number', { primaryKey: true, autoIncrement: true }),
  defineProperty('username', 'string'),
  defineProperty('email', 'string'),
]);

```

<p>5. Generate Migrations</p>

```
npm run orm generate ./models/user.ts create_user_table
```

<p>6. Run Migrations</p>

```
npm run orm migrate
```

<p>7. Run the ORM</p>

```
npx tsx watch src/index.ts
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   TypeScript
*   Node.js
*   MYSQL
*   mysql2
*   ES module
