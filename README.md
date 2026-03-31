# School Management API

## Overview
This is a simple **Node.js API** for managing school data.  
It allows users to:

- **Add new schools** with name, address, and geographic coordinates.  
- **List all schools** sorted by their distance from the user’s current location.  

The goal is to demonstrate **API development with Node.js, Express, and MySQL**, with basic validation and location-based sorting.

---

## Technologies Used

- **Node.js** (server-side JavaScript)  
- **Express.js** (for building REST APIs)  
- **MySQL** (FreeSQLDatabase for data storage)  
- **mysql2** (Node.js driver to connect to MySQL)  
- **Postman** (for API testing)  

---

## Database Setup

The database contains a single table `schools`:

| Field     | Type       | Description                     |
|-----------|-----------|---------------------------------|
| id        | INT       | Primary Key, auto-increment     |
| name      | VARCHAR   | School name                     |
| address   | VARCHAR   | School address                  |
| latitude  | FLOAT     | Latitude coordinate of the school |
| longitude | FLOAT     | Longitude coordinate of the school |

**SQL to create table:**
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
