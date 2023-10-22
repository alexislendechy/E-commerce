# E-commerce Back-End

## Table of Contents
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Associations](#associations)
- [License](#license)

## Description
This is a back-end server for an e-commerce application built using Express.js, Sequelize, and MySQL. It provides a robust API for managing product categories, products, and tags. Users can create, read, update, and delete categories, products, and tags through various API routes.

## Technologies Used
- Node.js
- Express.js
- Sequelize (with MySQL)
- dotenv (for environment variables)

## Installation
1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/alexislendechy/E-commerce
2. Navigate to the project directory:
   ```sh
   cd E-commerce
3. Install dependencies using npm:
    ```sh
    npm install
4. Create a .env file in the root directory with the following content:
    ```sh
    DB_NAME='ecommerce_db'
    DB_USER='<your-mysql-username>'
    DB_PASSWORD='<your-mysql-password>'
5. Set up your MySQL database by running the schema file:
    ```sh
    npm run schema
6. Seed your database with initial data:
    ```sh
    npm run seed
7. Start the server:
    ```sh
    npm start
## Usage
* The server will start, and you can make API requests to interact with the database using tools like Insomnia Core or Postman.
* The server will listen on the specified port (default is 3001).
* Use the provided API routes to manage categories, products, and tags.
## Database Schema
The database contains the following models and their properties:

* Category
    * id (Primary Key)
    * category_name
* Product
    * id (Primary Key)
    * product_name
    * price
    * stock
    * category_id (Foreign Key)
* Tag
    * id (Primary Key)
    * tag_name
* ProductTag
    * id (Primary Key)
    * product_id (Foreign Key)
    * tag_id (Foreign Key)
## API Routes
### Categories

 * `GET /api/categories`: Retrieve all categories with associated products.
* `GET /api/categories/:id`: Retrieve a single category by ID with associated products.
* `POST /api/categories`: Create a new category.
PUT /api/categories/:id: Update a category by ID.
* `DELETE /api/categories/:id`: Delete a category by ID.
### Products

* `GET /api/products`: Retrieve all products with associated category and tags.
* `GET /api/products/:id`: Retrieve a single product by ID with associated category and tags.
* `POST /api/products`: Create a new product.
* `PUT /api/products/:id`: Update a product by ID.
* `DELETE /api/products/:id`: Delete a product by ID.
### Tags

* `GET /api/tags`: Retrieve all tags with associated products.
* `GET /api/tags/:id`: Retrieve a single tag by ID with associated products.
* `POST /api/tags`: Create a new tag.
* `PUT /api/tags/:id`: Update a tag by ID.
* `DELETE /api/tags/:id`: Delete a tag by ID.
## Associations
* Category has many Products.
* Product belongs to a Category.
* Product belongs to many Tags through the ProductTag model.
* Tag belongs to many Products through the ProductTag model.
## License
This project is licensed under the MIT License.