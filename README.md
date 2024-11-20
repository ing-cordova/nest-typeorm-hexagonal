# 📚 NESTJS WITH HEXAGONAL ARCHITECTURE API

This API-Template was designed and built with **NestJS** and TypeORM. It follows the **Hexagonal Architecture** pattern, which is a software architecture pattern that is used to create loosely coupled application components. The Hexagonal Architecture pattern is also known as the Ports and Adapters pattern.

This api template was designed to help developers quickly build applications that are scalable, maintainable, and easy to use. Furthermore, the api use and requires **unit testing** to ensure that the application works as expected. It is designed to be used in production, and it is also open source.

## 🚀 FEATURES

- **Authentication**: This API uses JWT (jsonwebtoken) for authentication.

## 🛠 Technologies Used

- **Backend**: NestJS, TypeORM, TypeScript
- **Authentication**: JWT (jsonwebtoken)
- **Database**: It supports PostgreSQL and others based on TypeORM. (Currently PostgreSQL)
- **ORM**: TypeORM
- **Testing**: Jest for unit testing
- **Documentación**: Swagger for API documentation.

## 📂 Project Structure
```bash
src/
│
├── context/                      # Context of the project
│   ├── userProfile/              # UserProfile Entity Folder
│   │   ├── application/          # Entity UseCases
│   │   │   ├── use-case/
│   │   ├── domain/               # Domain Entity
│   │   └── infraestructure/      # Infraestructure of the entity
│   ├── seeds/                    # Seeders Folder
│   ├── services/                 # Global Services
│   └── shared/                   # Global Shared Modules
└──
```

## 📦 Instalation 

1. Clone the repository
```bash
git clone https://github.com/ing-cordova/nest-typeorm-hexagonal.git
```

2. Navigate to the repository
```bash
cd nest-typeorm-hexagonal
```

3. Install dependencies
```bash
npm install
```

4. **Set up your database**: By default, the application uses a PostgreSQL database. You can change the database configuration in the `.env` file. You can use the following databases:

### Supported databases:

* MySQL or MariaDB
* PostgreSQL or CockroachDB
* SQLite
* Microsoft SQL Server
* Oracle
* SAP Hana
* Google Cloud Spanner
* MongoDB (experimental)

### Installation:

To use a different database, you need to install the right driver for your environment:

```bash
npm install DRIVER_NAME --save
```


| Database | Driver |
| --- | --- |
| MySQL or MariaDB | `mysql` or `mysql2` |
| PostgreSQL or CockroachDB | `pg` |
| SQLite | `sqlite3` |
| Microsoft SQL Server | `mssql` |
| Oracle | `oracledb` |
| SAP Hana | `@sap/hana-client` and `hdb-pool` |
| Google Cloud Spanner | `@google-cloud/spanner` |
| MongoDB | `mongodb@^5.2.0` |

### Environment variables:

* For Google Cloud Spanner, you need to set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable with the path to your JSON key file.
* For SAP Hana, you need to set the `SPANNER_EMULATOR_HOST` environment variable if you want to use the emulator.

5. Set up environment variables
```bash
source .env
```

## ⚙️ Usage
1. Generate the migrations
```bash
npm run typeorm:generate -- ./src/migrations/initial-migration
```

2. Run the migrations
```bash
npm run typeorm:run
```

2.1 If you want to revert the migrations
```bash
npm run typeorm:revert
```

3. Run the seeders
```bash
npm run seed
```

4. Run the application
```bash
npm run start
```

## ✅ Unit Testing

1. Run unit tests
```bash
npm run test
```

## 📝 Documentation API

The Swagger documentation for this API is available at [http://localhost:3000/api](http://localhost:3000/api)


## 💡Acknowledgments

Feel free to explore the code and contribute to this project. If you have any questions or suggestions, don't hesitate to [contact me](https://github.com/ing-cordova).