CREATE DATABASE cardb;
\c cardb -- connects the cardb (like doing psql cardb)
DROP TABLE IF EXISTS carData;

CREATE TABLE carData (
    car_id serial,
    car_make varchar(20),
    car_model varchar(30),
    car_model_year integer,
    color varchar(20),
    mileage integer
)

CREATE TABLE owners (
    owner_id serial,
    car_id serial,
    first_name varchar(20),
    last_name varchar(20)
)