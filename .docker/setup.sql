ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

CREATE DATABASE IF NOT EXISTS pabrik_dorayaki;

USE pabrik_dorayaki;

CREATE TABLE IF NOT EXISTS resep (
    nama_resep VARCHAR(50),
    nama_bahan VARCHAR(50),
    jumlah INT
);

CREATE TABLE IF NOT EXISTS bahan_baku (
    nama_bahan VARCHAR(50),
    stok INT
);

CREATE TABLE IF NOT EXISTS request (
    request_name VARCHAR(255),
    nama_dorayaki VARCHAR(50),
    jumlah INT,
    status INT,
    ip TEXT,
    endpoint TEXT,
    timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS request_log (
    ip TEXT,
    endpoint TEXT,
    timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(64),
    isadmin INT
);