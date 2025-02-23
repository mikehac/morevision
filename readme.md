# Vehicle Fleet Application

This project is a Vehicle Fleet Management application built with Angular for the client-side and NestJS for the server-side.
The data is saved in Postgres db, running on docker container.
The application is containerized using Docker and Docker Compose.

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Running the Application

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/vehicle-fleet.git
   cd vehicle-fleet
   ```
2. **Build and run the containers**:
   ```sh
   - chmod +x start.sh
   - sudo ./start.sh
   ```
3. **Access the application**:
   - Client: http://localhost
   - Server API: http://localhost:3000
   - Swagger API Documentation: http://localhost:3000/api/docs
4. **To stop the running containers, use the following command**
   ```sh
   docker-compose down
   ```

## API Endpoints

### Vehicle Endpoints

- Create a new vehicle

```sh
POST http://localhost:3000/vehicle
Content-Type: application/json

{
  "licensePlate": "123-45-678",
  "manufacturer": "Toyota",
  "model": "Corolla",
  "status": "active"
}
```

- Update a vehicle

```sh
PATCH http://localhost:3000/vehicle/:id
Content-Type: application/json

{
  "model": "Yaris",
  "status": "active"
}
```

- Delete a vehicle

```sh
DELETE http://localhost:3000/vehicle/:id
```

- Get all vehicles

```sh
GET http://localhost:3000/vehicle
```

- Get vehicles by status

```sh
GET http://localhost:3000/vehicle?status=active
```

## Additional Tools and Dependencies

### Client-Side (Angular)

Angular CLI - Command Line Interface for Angular
AG Grid - Advanced Data Grid for Angular
NG-ZORRO - Ant Design for Angular

### Server-Side (NestJS)

NestJS - A progressive Node.js framework
TypeORM - ORM for TypeScript and JavaScript
Swagger - API Documentation
pgtools - PostgreSQL tools for Node.js

## Environment Variables

- Docker-compose.yml includes some environment variable for connecting to the postgres database.
- When hosting the appliction on the cloud environment, such as Azure cloud, it is very recomended to store those variables in Keyvault storage.
