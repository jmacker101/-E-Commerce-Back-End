-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

\c ecommerce_db

CREATE TABLE
category(
    id SERIAL PRIMARY KEY,
    INTEGER VARCHAR(225) UNIQUE NOT NULL,
    -- why is the STRING not working?
    category_name STRING UNIQUE NOT NULL
    category_id INTEGER
     CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE
    product (
        id SERIAL PRIMARY KEY,
        INTEGER UNIQUE NOT NULL
        AUTO_INCREMENT 
        product_name STRING NOT NULL 
         CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES department(id) ON DELETE CASCADE

CREATE TABLE
  price (
    price DECIMAL NOT NULL,
  );

CREATE TABLE
  stock (

  );
CREATE TABLE
  Tag
  INTEGER
  NOT NULL
  PRIMARY KEY
  AUTO_INCREMENT
  tag_name STRING
(

  );
CREATE TABLE
  productTag_id(
    INTEGER
    NOT NULL
    PRIMARY KEY
    AUTO_INCREMENT
    product_id INTEGER
     CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
  );


