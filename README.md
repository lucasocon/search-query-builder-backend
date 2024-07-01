## NestJS API - Skills Matrix query builder

This API provides functionalities for managing employee data, including searching and filtering employees based on skills, positions, and experience. It utilizes NestJS for a robust backend framework and Prisma for interacting with a database.

**Features**

* Search employees by skills, positions, and experience.
* Filter employees by seniority and last worked date.
* Uses Prisma for data persistence.

**Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/lucasocon/search-query-builder-backend.git
   ```

2. Install dependencies:

   ```bash
   cd search-query-builder-backend
   npm install
   ```

**Usage**

1. Start the development server:

   ```bash
   npm run start:dev
   ```

   This will start the server on port 3000 (http://localhost:3000).

**Environment Variables**

The following environment variables are required:

* `DATABASE_URL`: URL for connecting to the database (refer to Prisma documentation for format).

**Testing**

Run the API tests with:

```bash
npm test
```

**Contribution**

We welcome contributions! Please create pull requests following standard coding conventions.

**License**

This project is licensed under the MIT License.
