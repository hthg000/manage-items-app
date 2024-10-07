# Product Management App

A application for managing products, built with:

- **Backend**: NestJS
- **Frontend**: Angular

## Features
- CRU and Soft Delete operations for products/category
- Pagination, sorting and searching
- Image upload and storage

## Installation

```bash
$ npm install
```

## Running the app
```bash
$ npm run dev # watch mode
```

## API Endpoints
```bash
GET /products           # Get all products
GET /products/:id       # Get a product by ID
POST /products          # Create a product
PATCH /products/:id     # Update a product
DELETE /products/:id    # Delete a product

GET /categories           # Get all categories
GET /categories/:id       # Get a category by ID:
POST /categories          # Create a category
PATCH /categories/:id     # Update a category
DELETE /categories/:id    # Delete a category
```
