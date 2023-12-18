CREATE DATABASE cardb;
\c cardb -- connects the cardb (like doing psql cardb)
DROP TABLE IF EXISTS carData;

CREATE TABLE carData (
    car_id serial PRIMARY KEY,
    car_make varchar(20),
    car_model varchar(30),
    car_model_year integer,
    color varchar(20),
    mileage integer,
    owner_id integer NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES owners (owner_id) ON DELETE CASCADE
)

CREATE TABLE owners (
    id serial PRIMARY KEY,
    first_name varchar(20),
    last_name varchar(20)
)

-- CREATE TABLE owners (
--     id serial PRIMARY KEY,
--     name text,
--     age integer
-- );

-- CREATE TABLE properties (
--     id serial PRIMARY KEY,
--     name text,
--     num_units integer,
--     owner_id integer NOT NULL,
--     FOREIGN KEY (owner_id) REFERENCES owners (id) ON DELETE CASCADE
-- );